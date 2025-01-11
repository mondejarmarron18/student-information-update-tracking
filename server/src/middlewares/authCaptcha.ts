import axios from "axios";
import customErrors from "../constants/customErrors";
import { IMiddlware } from "../types/middleware";
import CustomResponse from "../utils/CustomResponse";
import { x8tAsync } from "x8t";
import config from "../utils/config";

const authReCaptcha: IMiddlware = async (req, res, next) => {
  const captchaToken = req.headers["x-captcha-token"];

  const { error, result } = await x8tAsync(() =>
    axios.get(`https://www.google.com/recaptcha/api/siteverify`, {
      params: {
        secret: config.recaptchaSecretKey,
        response: captchaToken,
      },
    })
  );

  if (error || !result?.data.success) {
    return CustomResponse.sendError(res, {
      ...customErrors.badRequest,
      description: "Verify that you are not a robot",
      details: error || "Invalid captcha token",
    });
  }

  next();
};

export default authReCaptcha;
