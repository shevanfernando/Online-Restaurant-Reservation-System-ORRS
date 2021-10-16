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

const personDTOObject = Joi.object({
  firstName: Joi.string().min(1).max(20).required().messages({
    'string.base': `First Name should be a type of 'string'`,
    'string.empty': `First Name cannot be an empty field`,
    'string.min': `First Name should have a minimum length of {#limit}.`,
    'string.max': `First Name should have a max length of {#limit}`,
    'any.required': 'First Name is required',
  }),
  lastName: Joi.string().min(1).max(20).messages({
    'string.base': `Last Name should be a type of 'string'`,
    'string.empty': `Last Name cannot be an empty field`,
    'string.min': `Last Name should have a minimum length of {#limit}.`,
    'string.max': `Last Name should have a max length of {#limit}`,
    'any.required': 'Last Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': `Email should be a type of 'string'`,
    'string.empty': `Email cannot be an empty field`,
    'string.email': 'Email is invalid.',
    'any.required': 'Email is required.',
  }),
  phoneNumber: Joi.string()
    .regex(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4}$/)
    .messages({
      'string.base': `Phone number should be a type of 'string'`,
      'string.pattern.base': 'Phone number is invalid.',
    }),
  nic: Joi.string()
    .regex(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m)
    .required()
    .messages({
      'string.base': `NIC should be a type of 'string'`,
      'string.pattern.base': `NIC is invalid.`,
      'any.required': `NIC is required.`,
    }),
}).required();

const userDTOObject = (userType: UserType): Joi.ObjectSchema => {
  return Joi.object({
    username: Joi.string().min(2).max(20).required().messages({
      'string.base': `User Name should be a type of 'string'`,
      'string.empty': `User Name cannot be an empty field`,
      'string.min': `User Name should have a minimum length of {#limit}.`,
      'string.max': `User Name should have a max length of {#limit}`,
      'any.required': 'User Name is required',
    }),
    password: Joi.string().min(4).max(20).required().messages({
      'string.base': `Password should be a type of 'string'`,
      'string.empty': `Password cannot be an empty field`,
      'string.min': `Password should have a minimum length of {#limit}.`,
      'string.max': `Password should have a max length of {#limit}`,
      'any.required': 'Password is required',
    }),
    userType: Joi.valid(userType).required().messages({ 'any.only': `User Type is allow only, {#valids}` }),
  }).required();
};

export const customerRegisterDTOObject = Joi.object({
  person: personDTOObject,
  user: userDTOObject(UserType.CUSTOMER),
}).required();

export const staffRegisterDTOObject = Joi.object({
  person: personDTOObject,
  user: userDTOObject(UserType.STAFF),
  staffType: Joi.valid(StaffType.CHEF, StaffType.RECEPTIONIST, StaffType.WAITER)
    .required()
    .messages({ 'any.only': `Staff Type is allow only, {#valids}` }),
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
