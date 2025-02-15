import { createTransport, SendMailOptions, SentMessageInfo } from "nodemailer";
import config from "./config";
import { x8tAsync } from "x8t";

const { smtp } = config;

const transporter = createTransport({
  service: smtp.service,
  port: smtp.port,
  host: smtp.host,
  secure: smtp.secure,
  auth: {
    user: smtp.user,
    pass: smtp.password,
  },
});

export type TSendMail =
  | {
      result: SentMessageInfo;
      error: null;
    }
  | {
      result: null;
      error: unknown;
    };

export const sendMail = async (
  options: SendMailOptions
): Promise<TSendMail> => {
  const { result, error } = await x8tAsync(
    transporter.sendMail({
      from: `${config.appName} <${smtp.sender}>`,
      ...options,
    })
  );

  if (error) {
    console.error("Error sending email:", error);
    return {
      result: null,
      error,
    };
  }

  return {
    result,
    error: null,
  };
};
