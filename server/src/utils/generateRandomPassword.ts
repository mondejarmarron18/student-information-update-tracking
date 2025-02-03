import { passwordMinLength, passwordSpecialCharacters } from "./password";

const generateRandomPassword = () => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  const randomSpecial =
    passwordSpecialCharacters[
      Math.floor(Math.random() * passwordSpecialCharacters.length)
    ];
  const randomUppercase =
    uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  const randomLowercase =
    lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

  let password =
    randomSpecial + randomUppercase + randomLowercase + randomNumber;

  const allChars =
    passwordSpecialCharacters + uppercaseChars + lowercaseChars + numbers;
  while (password.length < passwordMinLength * 2) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};

export default generateRandomPassword;
