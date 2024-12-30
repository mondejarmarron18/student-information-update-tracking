import { Router } from "express";

const userProfileRoute = Router();

userProfileRoute.get("/", (req, res) => {
  res.send("User Profile");
});

export default userProfileRoute;
