export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const verifyOtp = (otp: number, generatedOtp: number) => {
  return otp === generatedOtp;
};
