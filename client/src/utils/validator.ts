export const allowedSpecialCharacters = `@#$%^&*_-`;
export const allowedLength = 8;

export const hasSpecialCharacter = (val: string) => {
  const specialCharacters = new RegExp(`[${allowedSpecialCharacters}]`);
  return specialCharacters.test(val);
};

export const hasUppercase = (val: string) => {
  const uppercase = /[A-Z]/;
  return uppercase.test(val);
};

export const hasLowercase = (val: string) => {
  const lowercase = /[a-z]/;
  return lowercase.test(val);
};

export const hasNumber = (val: string) => {
  const number = /[0-9]/;
  return number.test(val);
};

export const hasLength = (val: string) => {
  return val.length >= allowedLength;
};

export const isValidPassword = (password: string) => {
  return (
    hasSpecialCharacter(password) &&
    hasUppercase(password) &&
    hasLowercase(password) &&
    hasNumber(password) &&
    hasLength(password)
  );
};
