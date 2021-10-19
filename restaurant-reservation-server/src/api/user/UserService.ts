/**
 * @created 26/09/2021 - 16:06
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    UserService
 */

import { Prisma, PrismaClient, Customer, Staff, UserType } from '@prisma/client';
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
    const user = await this.prisma.user.findUnique({ where: { username: data.username } });
    if (user !== null) {
      const passwordIsCorrect = await this.passwordCrypto.compare(data.password, user.password);
      if (passwordIsCorrect) {
        switch (user.userType) {
          case UserType.CUSTOMER: {
            const tmp = await this.prisma.customer.findFirst({
              where: { userId: user.id },
              include: { Person: true },
            });
            if (tmp !== null) {
              this.payload = {
                name: `${tmp.Person.firstName} ${tmp.Person.lastName}`,
                userId: tmp.customerId,
                userType: user.userType,
              };
            }
            break;
          }
          case UserType.STAFF: {
            const tmp = await this.prisma.staff.findFirst({
              where: { userId: user.id },
              include: { Person: true },
            });
            if (tmp !== null) {
              this.payload = {
                name: `${tmp.Person?.firstName} ${tmp.Person?.lastName}`,
                staffId: tmp.staffId,
                userType: tmp.staffType,
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
  ): Promise<Prisma.Prisma__CustomerClient<Customer | void>> {
    const id = await sequenceGenerator.idGenerator('CUS_', 'customer');
    data.user.password = await this.passwordCrypto.encrypt(data.user.password);
    return this.prisma.customer
      .create({
        data: { customerId: id, Person: { create: data.person }, User: { create: data.user } },
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

  public async staffRegistration(data: StaffRegisterDTO): Promise<Prisma.Prisma__StaffClient<Staff | void>> {
    const id = await sequenceGenerator.idGenerator('STF_', 'staff');
    data.user.password = await this.passwordCrypto.encrypt(data.user.password);
    return this.prisma.staff
      .create({
        data: {
          staffId: id,
          staffType: data.staffType,
          Person: { create: data.person },
          User: { create: data.user },
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
