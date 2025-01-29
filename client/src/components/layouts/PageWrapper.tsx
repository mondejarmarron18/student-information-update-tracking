import { Outlet } from "react-router";
import NavigationBar from "../common/NavigationBar";
import Header from "../common/Header";
import useActiveRoute from "@/hooks/useActiveRoute";
import useAccessToken from "@/hooks/useAccessToken";
import { routePaths } from "@/routes";
import ResourceForbidden from "@/components/common/ResourceForbidden";

const routes = Object.values(routePaths);

const PageWrapper = () => {
  const activeRoute = useActiveRoute();
  const { decodedAccessToken } = useAccessToken();
  const userRole = decodedAccessToken()?.roleId?.name;

  const route = routes.find(({ name }) => activeRoute?.name === name);

  const isAccessible = !(
    !route?.roles?.includes(userRole as string) && route?.roles
  );

  return (
    <div className="flex gap-2 lg:gap-4 flex-col-reverse lg:flex-row h-full p-2 lg:p-4">
      <NavigationBar />
      <div className="flex-1 flex flex-col gap-2 lg:gap-4 overflow-hidden">
        <Header />
        <div className="flex-1 h-full overflow-auto">
          {isAccessible ? <Outlet /> : <ResourceForbidden />}
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
