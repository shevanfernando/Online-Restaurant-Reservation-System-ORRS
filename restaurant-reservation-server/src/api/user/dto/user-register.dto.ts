import { UserType, StaffType } from '.prisma/client';
import Joi, { ValidationError } from 'joi';

export type PersonDTO = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nic: string;
};

export type UserDTO = {
  username: string;
  password: string;
  userType: UserType;
};

export type CustomerRegisterDTO = {
  person: PersonDTO;
  user: UserDTO;
};

export type StaffRegisterDTO = {
  person: PersonDTO;
  user: UserDTO;
  staffType: StaffType;
};

export const customerRegisterDTOObject = Joi.object({
  person: Joi.object({
    firstName: Joi.string().min(1).max(20).required(),
    lastName: Joi.string().min(1).max(20),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().regex(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/),
    nic: Joi.string()
      .regex(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m)
      .required(),
  }).required(),
  user: Joi.object({
    username: Joi.string().min(2).max(20).required(),
    password: Joi.string().min(4).max(20).required(),
    userType: Joi.valid(UserType.CUSTOMER, UserType.STAFF).required(),
  }).required(),
}).required();

export const staffRegisterDTOObject = Joi.object({
  person: Joi.object({
    firstName: Joi.string().min(1).max(20).required(),
    lastName: Joi.string().min(1).max(20),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().regex(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/),
    nic: Joi.string()
      .regex(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m)
      .required(),
  }).required(),
  user: Joi.object({
    username: Joi.string().min(2).max(20).required(),
    password: Joi.string().min(4).max(20).required(),
    userType: Joi.valid(UserType.CUSTOMER, UserType.STAFF).required(),
  }).required(),
  staffType: Joi.valid(StaffType.ADMIN, StaffType.CHEF, StaffType.RECEPTIONIST, StaffType.WAITER).required(),
}).required();

export default {
  validateCustomerDTO: (data: unknown): { error?: ValidationError; value: CustomerRegisterDTO } => {
    return customerRegisterDTOObject.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
  },
  validateStaffDTO: (data: unknown): { error?: ValidationError; value: StaffRegisterDTO } => {
    return staffRegisterDTOObject.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
  },
};
