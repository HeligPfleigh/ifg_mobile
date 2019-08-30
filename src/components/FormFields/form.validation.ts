import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import I18n from '../../core/i18n';

// required object value
export const objRequired = (value: any) => (isEmpty(value) ? I18n.t('messages.required') : undefined);

// Check required
export const required = (value: any) => (value ? undefined : I18n.t('messages.required'));

// Check max length
export const maxLength = (max: number) => (value: any) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength3 = maxLength(3);
export const maxLength9 = maxLength(9);
export const maxLength15 = maxLength(15);
export const maxLength25 = maxLength(25);
export const maxLength120 = maxLength(120);

// Check min length
export const minLength = (min: number) => (value: any) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
export const minLength4 = minLength(4);
export const minLength6 = minLength(6);
export const minLength8 = minLength(8);

// Check range value
export const strLength = (min: number = 5, max: number = 25) => (value: any) =>
  value && !validator.isLength(value, { min, max })
    ? `It must have length from ${min} to ${max} characters`
    : undefined;
export const normalLength = strLength();
export const longLength = strLength(5, 255);

// Check min value
export const minValue = (min: number) => (value: any) =>
  value && value < min ? `The number muss be greater than ${min}` : undefined;
export const minValue16 = minValue(16);
export const minValue18 = minValue(18);

export const comparePassword = (pattern: any, value: any) =>
  value && value === pattern ? undefined : I18n.t('messages.pwd_confirm');

// Check only input number
export const number = (value: any) => (value && !validator.isNumeric(value) ? 'Only input number' : undefined);

// Check hasWhiteSpace
export const hasWhiteSpace = (value: any) =>
  value && validator.contains(value, ' ') ? "Field can't contain space character" : undefined;

// Check email
export const email = (value: any) => (value && !validator.isEmail(value) ? 'Invalid email address' : undefined);

export const alphaNumeric = (value: any) =>
  value && !validator.isAlphanumeric(value) ? 'Only alphanumeric characters' : undefined;

// phone validate
export const phoneNumber = (value: any) =>
  value && !validator.isMobilePhone(value, 'en-US') ? 'Invalid phone number' : undefined;

// password validate
export const password = (value: any) =>
  value && (!/\d/.test(value) || !/[A-Z]/.test(value))
    ? 'Field must contain at least 1 uppercase letter and special character'
    : undefined;

// username validate
export const hasSpecialChart = (value: any) =>
  value && (!validator.isAlphanumeric(value) && !validator.isAlpha(value) && !validator.matches(value, /^[\w.]+$/g))
    ? 'The username has a special character'
    : undefined;

// username validate
export const chartFirstRequired = (value: any) =>
  value && validator.isNumeric(value.charAt(0)) ? 'The first character must be a letter' : undefined;
