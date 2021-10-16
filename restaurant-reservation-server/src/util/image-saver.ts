/**
 * @created 11/10/2021 - 15:50
 * @project settings.json
 * @author  Shevan
 * @file    image-saver
 */

import { Express, Request } from 'express';
import multer, { diskStorage, FileFilterCallback } from 'multer';
import { HttpError } from '@lib/HttpError';
import fs from 'fs';
import path from 'path';

const generateFileName = (fileName: string): string => {
  return `${Date.now()}_${Math.floor(Math.random() * 999999999) + path.extname(fileName)}`;
};

const storage = diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    const path = './uploads';
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    callback(null, `./uploads`);
  },

  filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) =>
    callback(null, `${generateFileName(file.originalname)}`),
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (file.originalname.toLowerCase().match(/\.(jpeg|jpg|png)$/)) {
    callback(null, true);
  } else {
    callback(
      new HttpError(400, 'Uploaded Image is not a valid type, only allowed these "jpg/jpeg or png" image types.')
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('image');

export default upload;
