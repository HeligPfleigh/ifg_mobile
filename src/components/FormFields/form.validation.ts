import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import I18n from '../../core/i18n';

// required object value
export const objRequired = (value: any) => (isEmpty(value) ? I18n.t('messages.required') : undefined);

// Check required
export const required = (value: any) => (value ? undefined : I18n.t('messages.required'));

// Check max length
export const maxLength = (max: number) => (value: any) =>
  value && value.length > max ? `${I18n.t('messages.must_be')} ${max} ${I18n.t('messages.or_less')}` : undefined;
export const maxLength3 = maxLength(3);
export const maxLength9 = maxLength(9);
export const maxLength15 = maxLength(15);
export const maxLength25 = maxLength(25);
export const maxLength120 = maxLength(120);

// Check min length
export const minLength = (min: number) => (value: any) =>
  value && value.length < min ? `${I18n.t('messages.must_be')} ${min} ${I18n.t('messages.or_more')}` : undefined;
export const minLength2 = minLength(2);
export const minLength4 = minLength(4);
export const minLength6 = minLength(6);
export const minLength8 = minLength(8);

// Check range value
export const strLength = (min: number = 5, max: number = 25) => (value: any) =>
  value && !validator.isLength(value, { min, max })
    ? `${I18n.t('messages.must_length')}${min} ${I18n.t('messages.to')} ${max} ${I18n.t('messages.characters')}`
    : undefined;
export const normalLength = strLength();
export const longLength = strLength(5, 255);

// Check min value
export const minValue = (min: number) => (value: any) =>
  value && value < min ? `${I18n.t('messages.check_min')} ${min}` : undefined;
export const minValue16 = minValue(16);
export const minValue18 = minValue(18);

export const comparePassword = (pattern: any, value: any) =>
  value && value === pattern ? undefined : I18n.t('messages.pwd_confirm');

// Check only input number
export const number = (value: any) =>
  value && !validator.isNumeric(value) ? I18n.t('messages.only_number') : undefined;

// Check hasWhiteSpace
export const hasWhiteSpace = (value: any) =>
  value && validator.contains(value, ' ') ? I18n.t('messages.has_space') : undefined;

// Check email
export const email = (value: any) =>
  value && !validator.isEmail(value) ? I18n.t('messages.email_invalid') : undefined;

export const alphaNumeric = (value: any) =>
  value && !validator.isAlphanumeric(value) ? I18n.t('messages.only_alpha') : undefined;

// phone validate
export const phoneNumber = (value: any) =>
  value && !validator.isMobilePhone(value, 'en-US') ? I18n.t('messages.phone_invalid') : undefined;

// password validate
export const password = (value: any) =>
  value && (!/\d/.test(value) || !/[A-Z]/.test(value)) ? I18n.t('messages.pwd_valid') : undefined;

// username validate
export const hasSpecialChart = (value: any) =>
  value && (!validator.isAlphanumeric(value) && !validator.isAlpha(value) && !validator.matches(value, /^[\w.]+$/g))
    ? I18n.t('messages.user_name_special_chart')
    : undefined;

// username validate
export const chartFirstRequired = (value: any) =>
  value && validator.isNumeric(value.charAt(0)) ? I18n.t('messages.first_chart_letter') : undefined;
