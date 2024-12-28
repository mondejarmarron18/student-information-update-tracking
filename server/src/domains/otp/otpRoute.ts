import { Router } from "express";
import OtpControler from "./otpController";
import OtpMiddleware from "./otpMiddleware";

const route = Router();
const otpController = new OtpControler();
const otpMiddleware = new OtpMiddleware();

route.post("/", otpMiddleware.generateOtp, otpController.generateOtp);
route.post("/verify", otpMiddleware.verifyOtp, otpController.verifyOtp);
route.get("/", otpController.getOtps);

export default Router().use("/otp", route);
