import { ReactNode } from "react";
import { Navigate } from "react-router";
import { routePaths } from ".";
import useAccessToken from "@/hooks/useAccessToken";

type Props = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { accessToken } = useAccessToken();

  return accessToken ? children : <Navigate to={routePaths.signIn} />;
};

export default PrivateRoute;
