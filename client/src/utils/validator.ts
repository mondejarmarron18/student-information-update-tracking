export const allowedSpecialCharacters = `@#$%^&*_-`;
export const mobileNumberRegex = /^\+[0-9]{1,3}[0-9]{7,15}$/;
export const allowedLength = 8;
export const allowedEmailDomains = ["phinmaed.com"];

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

export const isNumber = (val: string) => {
  const number = /^[0-9]+$/;
  return number.test(val);
};

export const isValidEmail = (val: string) => {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.test(val);
};

export const hasAllowedEmailDomain = (val: `${string}@${string}`) => {
  if (isValidEmail(val) === false) return false;

  const emailDomain = val.split("@")[1];

  return allowedEmailDomains.includes(emailDomain);
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const isMobileNumber = (val: string) => {
  return mobileNumberRegex.test(val);
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
