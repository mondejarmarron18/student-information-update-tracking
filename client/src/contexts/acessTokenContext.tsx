import cookie from "@/utils/cookie";
import { createContext, ReactNode, useState } from "react";

type AccessTokenContext = {
  accessToken: string | undefined;
  setAccessToken: (accessToken: string) => void;
  removeAccessToken: () => void;
};

export const accessTokenContext = createContext<AccessTokenContext>({
  setAccessToken: () => {},
  accessToken: undefined,
  removeAccessToken: () => {},
});

export const AccessTokenProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, _setAccessToken] = useState(cookie.accessToken.get());

  const setAccessToken = (accessToken: string) => {
    cookie.accessToken.set(accessToken);
    _setAccessToken(accessToken);
  };

  const removeAccessToken = () => {
    cookie.accessToken.remove();
    _setAccessToken(undefined);
  };

  return (
    <accessTokenContext.Provider
      value={{ accessToken, setAccessToken, removeAccessToken }}
    >
      {children}
    </accessTokenContext.Provider>
  );
};
