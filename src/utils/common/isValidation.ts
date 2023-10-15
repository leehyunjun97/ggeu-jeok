type validationType = 'email' | 'password' | 'nickName' | 'name';

export const isValidationCheck = (value: string, type: validationType) => {
  if (value.trim().length === 0) return true;
  if (type === 'email') {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
    const isRegExp = regExp.test(value);
    return isRegExp;
  }

  if (type === 'password') {
    return value.trim().length >= 6;
  }

  if (type === 'nickName') {
    return value.trim().length >= 3;
  }

  if (type === 'name') {
    return value.trim().length >= 2;
  }
};

export const isVisibleDisplay = (value: string, type: validationType) => {
  return isValidationCheck(value, type) ? 'displayNone' : 'displayBlock';
};

export const isVisibleText = (
  value: string,
  type: validationType,
  errorText: string
) => {
  return isValidationCheck(value, type) ? '' : errorText;
};
