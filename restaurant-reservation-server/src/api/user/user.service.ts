/**
 * @created 26/09/2021 - 16:06
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    UserService
 */

import { customer, Prisma, PrismaClient, staff, user_type } from '@prisma/client';
import { UserLoginDTO } from '@api/user/dto/user-login.dto';
import { HttpError } from '@lib/HttpError';
import { JWT } from '@util/JWT';
import { PasswordCrypto } from '@util/PasswordCrypto';
import { CustomerRegisterDTO, StaffRegisterDTO } from '@api/user/dto/user-register.dto';
import titleCaseConverter from '@util/title-case-converter';
import sequenceGenerator from '@util/IdSequenceGenerator';

export class UserService {
  private jwt: JWT;
  private prisma: PrismaClient;
  private passwordCrypto: PasswordCrypto;
  private payload: { [key: string]: string } | undefined;

  constructor() {
    this.jwt = new JWT();
    this.prisma = new PrismaClient();
    this.passwordCrypto = new PasswordCrypto();
  }

  public async login(data: UserLoginDTO): Promise<string> {
    const user = await this.prisma.app_user.findUnique({ where: { username: data.username } });
    if (user !== null) {
      const passwordIsCorrect = await this.passwordCrypto.compare(data.password, user.password);
      if (passwordIsCorrect) {
        switch (user.user_type) {
          case user_type.CUSTOMER: {
            const tmp = await this.prisma.customer.findFirst({
              where: { user_id: user.id },
              include: { person: true },
            });
            if (tmp !== null) {
              this.payload = {
                name: `${tmp.person.first_name} ${tmp.person.last_name}`,
                user_id: tmp.id,
                user_type: user.user_type,
              };
            }
            break;
          }
          case user_type.STAFF: {
            const tmp = await this.prisma.staff.findFirst({
              where: { user_id: user.id },
              include: { person: true },
            });
            if (tmp !== null) {
              this.payload = {
                name: `${tmp.person?.first_name} ${tmp.person?.last_name}`,
                staffid: tmp.id,
                user_type: tmp.staff_type,
              };
            }
            break;
          }
        }
        return this.jwt.generateToken(this.payload);
      }
      throw new HttpError(400, 'Username or password is invalid.');
    }
    throw new HttpError(400, 'User is not registered');
  }

  public async customerRegistration(
    data: CustomerRegisterDTO
  ): Promise<Prisma.Prisma__customerClient<customer | void>> {
    const id = await sequenceGenerator.idGenerator('CUS_', 'customer');
    data.app_user.password = await this.passwordCrypto.encrypt(data.app_user.password);
    return this.prisma.customer
      .create({
        data: { id: id, person: { create: data.person }, app_user: { create: data.app_user } },
      })
      .catch((err) => {
        const {
          code,
          meta: { target },
        } = err;
        if (code === 'P2002') {
          throw new HttpError(409, `${titleCaseConverter(target[0])} already exists.`);
        }
      });
  }

  public async staffRegistration(data: StaffRegisterDTO): Promise<Prisma.Prisma__staffClient<staff | void>> {
    const id = await sequenceGenerator.idGenerator('STF_', 'staff');
    data.app_user.password = await this.passwordCrypto.encrypt(data.app_user.password);
    return this.prisma.staff
      .create({
        data: {
          id: id,
          staff_type: data.staff_type,
          person: { create: data.person },
          app_user: { create: data.app_user },
        },
      })
      .catch((err) => {
        const {
          code,
          meta: { target },
        } = err;
        if (code === 'P2002') {
          throw new HttpError(409, `${titleCaseConverter(target[0])} already exists`);
        }
      });
  }
}
