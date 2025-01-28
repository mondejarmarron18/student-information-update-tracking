import { routePaths } from "@/routes";
import { useLocation } from "react-router";

const useActiveRoute = () => {
  const { pathname } = useLocation();

  return Object.values(routePaths).find(({ path }) => {
    if (path === "/") return pathname === path;

    return pathname.startsWith(path);
  });
};

export default useActiveRoute;
