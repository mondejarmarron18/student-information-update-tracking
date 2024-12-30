const contactMethods = {
  email: 1,
  phoneCall: 2,
  sms: 3,
} as const;

export type ContactMethods = keyof typeof contactMethods;
export type ContactMethodsValue = (typeof contactMethods)[ContactMethods];

export default contactMethods;
