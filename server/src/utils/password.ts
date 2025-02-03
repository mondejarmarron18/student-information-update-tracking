import bcrypt from "bcrypt";

export const passwordSpecialCharacters = "@#$&_";
export const passwordMinLength = 8;

export const passwordEncrypt = (password: string, salt: number = 10) => {
  return bcrypt.hashSync(password, salt);
};

export const passwordCompare = (
  password: string,
  encryptedPassword: string
) => {
  return bcrypt.compareSync(password, encryptedPassword);
};
