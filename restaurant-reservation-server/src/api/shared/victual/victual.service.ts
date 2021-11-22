/**
 * @created 18/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    victual.service
 */
import { Prisma, PrismaClient, Victual } from '@prisma/client';
import { ImageSaveDTO } from '@api/shared/victual/dto/image-save.dto';
import { HttpError } from '@lib/HttpError';

const prisma = new PrismaClient();

const addImage = async (data: ImageSaveDTO, field: string): Promise<Prisma.Prisma__VictualClient<Victual> | void> => {
  return prisma.victual
    .update({
      where: { victualId: data.victualId },
      data: { imagePath: data.imagePath },
    })
    .catch((err) => {
      const { code } = err;
      if (code === 'P2025') {
        throw new HttpError(404, `Can't find any ${field} item using this victual id.`);
      }
      return err;
    });
};

export default {
  addImage,
};
