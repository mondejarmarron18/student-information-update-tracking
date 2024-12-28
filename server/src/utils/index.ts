export const formatJwtExpires = (expiresIn: string) => {
  return expiresIn.replace(/(\d+)(m|h|d)/g, (match, number, unit) => {
    switch (unit) {
      case "h":
        return `${number} hours`;
      case "d":
        return `${number} days`;
      case "m":
        return `${number} minutes`;

      default:
        return match;
    }
  });
};
