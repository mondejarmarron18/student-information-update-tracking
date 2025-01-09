import { accessTokenContext } from "@/contexts/acessTokenContext";
import { useContext } from "react";

const useAccessToken = () => {
  const accessToken = useContext(accessTokenContext);

  if (!accessToken) {
    throw new Error("useAccessToken must be used within a AccessTokenProvider");
  }

  return accessToken;
};

export default useAccessToken;
