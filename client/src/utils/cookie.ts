import Cookies from "js-cookie";

const accessToken = {
  get: () => Cookies.get("accessToken"),
  set: (token: string) => {
    Cookies.set("accessToken", token, {
      sameSite: "Strict",
    });
  },
  remove: () => Cookies.remove("accessToken", { sameSite: "Strict" }),
};

const cookie = {
  accessToken,
};

export default cookie;
