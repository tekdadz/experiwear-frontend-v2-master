import * as yup from 'yup';

export const NAME_VALID = yup.string().required('Please enter name.');

export const EMAIL_VALID = yup
  .string()
  .email('Please enter a valid email address.')
  .required('Please enter email address.');

export const PASSWORD_VALID = yup
  .string()
  .required('Please enter in Password.')
  .min(6, 'Passwords need to be at least 6 characters.');

export const CONFIRM_PASSWORD_VALID = yup
  .string()
  .required('Please enter in Password.')
  .oneOf([yup.ref('password'), null], 'Passwords needs to match.');

export const TITLE_VALID = yup
  .string()
  .trim('This field cannot include leading and trailing spaces')
  .required('Please enter in this field.')
  .matches(/^[A-Za-z0-9' ?!]*$/, 'Please do not input special character');

export const STRING_VALID = yup
  .string()
  .trim('This field cannot include leading and trailing spaces')
  .required('Please enter in this field.')
  .matches(/^[A-Za-z0-9' ?!]*$/, 'Please do not input special character');

export const MAX_FIRMWARE_STRING_WIDTH = 75;

export const MAX_RESPONSE_NUMBER = 4;
