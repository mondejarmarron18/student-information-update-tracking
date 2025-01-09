import { ReactNode } from "react";
import { Navigate } from "react-router";
import { routePaths } from ".";
import useAccessToken from "@/hooks/useAccessToken";

type Props = {
  children: ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const { accessToken } = useAccessToken();

  return !accessToken ? children : <Navigate to={routePaths.dashboard} />;
};

export default PublicRoute;
