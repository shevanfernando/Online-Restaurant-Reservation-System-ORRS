/**
 * @created 18/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    image-save.dto
 */

import Joi from 'joi';

export type ImageSaveDTO = {
  image_path: string;
  id: number;
};

export const imageSaveDTOObject = Joi.object({
  image_path: Joi.string().required().messages({
    'string.base': 'Image Path should be a type of "string"',
    'string.empty': 'Image Path cannot be an empty field',
    'any.required': `Image Path is required`,
  }),
  id: Joi.number().required().messages({
    'number.base': 'victual Id should be a type of "number"',
    'number.positive': 'victual Id should be a positive amount',
    'any.required': 'victual Id is required',
  }),
});

export default {
  validate: (data: unknown): { error?: Joi.ValidationError; value: ImageSaveDTO } => {
    return imageSaveDTOObject.validate(data, { abortEarly: false, stripUnknown: true });
  },
};
