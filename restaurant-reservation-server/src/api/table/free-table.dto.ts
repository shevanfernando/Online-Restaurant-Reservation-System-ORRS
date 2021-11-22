/**
 * @created 22/11/2021
 * @project Online-Restaurant-Reservation-System-ORRS
 * @author  Shevan
 * @file    free-table.dto
 */
import Joi, { ValidationError } from "joi";

export type FreeTableDTO = {
  tableId: string
}

export const freeTableDTOObject = Joi.object({
  tableId: Joi.string().length(12).required().messages({
    "string.base": "Table Id should be a type of \"string\"",
    "string.empty": "Table Id cannot be an empty field",
    "string.length": `Table Id should have a {#limit} characters.`,
    "any.required": "Table Id is required"
  })
});

export default {
  validate: (data: unknown): { error?: ValidationError, value: FreeTableDTO } => freeTableDTOObject.validate(data, {
    abortEarly: false,
    stripUnknown: true
  })
};
