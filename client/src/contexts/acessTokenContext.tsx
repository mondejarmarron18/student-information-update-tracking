import { UserAccount } from "@/types/user.type";
import api from "@/utils/api";
import cookie from "@/utils/cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";
import { x8tSync } from "x8t";

type AccessTokenContext = {
  accessToken: string | undefined;
  setAccessToken: (accessToken: string) => void;
  removeAccessToken: () => void;
  decodedAccessToken: () => (JwtPayload & UserAccount) | undefined;
};

export const accessTokenContext = createContext<AccessTokenContext>({
  setAccessToken: () => {},
  accessToken: undefined,
  removeAccessToken: () => {},
  decodedAccessToken: () => undefined,
});

export const AccessTokenProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, _setAccessToken] = useState(cookie.accessToken.get());

  useEffect(() => {
    if (accessToken) {
      const decoded = decodedAccessToken();

      if (!decoded) return _setAccessToken(undefined);

      const now = Date.now();
      const exp = (decoded.exp || 0) * 1000;

      if (now >= exp) {
        api.head("/users/auth").catch((err) => {
          if (err.response?.status === 401) {
            _setAccessToken(undefined);
          }
        });
      }
    }
  }, [accessToken]);

  const setAccessToken = (accessToken: string) => {
    cookie.accessToken.set(accessToken);
    _setAccessToken(accessToken);
  };

  const removeAccessToken = () => {
    cookie.accessToken.remove();
    _setAccessToken(undefined);
  };

  const decodedAccessToken = () => {
    if (accessToken) {
      const { error, result } = x8tSync(() => jwtDecode(accessToken));

      if (error || !result) return;

      return result as JwtPayload & UserAccount;
    }
  };

  return (
    <accessTokenContext.Provider
      value={{
        accessToken,
        decodedAccessToken,
        setAccessToken,
        removeAccessToken,
      }}
    >
      {children}
    </accessTokenContext.Provider>
  );
};
