/**
 * @created 26/09/2021 - 16:06
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    UserService
 */

import { PrismaClient, UserType } from '@prisma/client';
import { UserLoginDTO } from '@src/api/user/dto/UserLoginDTO';
import { HttpError } from '@src/lib/HttpError';
import { JWT } from '@src/util/JWT';
import { PasswordCrypto } from '@src/util/PasswordCrypto';

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
      if (passwordIsCorrect !== null) {
        switch (user.userType) {
          case UserType.CUSTOMER: {
            const tmp = await this.prisma.customer.findFirst({
              where: { userId: user.id },
              include: { Person: true },
            });
            if (tmp !== null) {
              this.payload = {
                name: `${tmp.Person.firstName} ${tmp.Person.lastName}`,
                [`staffId`]: tmp.customerId,
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
                [`staffId`]: tmp.staffId,
                userType: user.userType,
              };
            }
            break;
          }
          case UserType.ADMIN: {
            const tmp = await this.prisma.admin.findFirst({
              where: { userId: user.id },
              include: { Person: true },
            });
            if (tmp !== null) {
              this.payload = {
                name: `${tmp.Person?.firstName} ${tmp.Person?.lastName}`,
                [`staffId`]: tmp.adminId,
                userType: user.userType,
              };
            }
          }
        }

        return this.jwt.generateToken(this.payload);
      }
      throw new HttpError(400, 'Username or password not valid.');
    }
    throw new HttpError(400, 'User not registered');
  }
}
