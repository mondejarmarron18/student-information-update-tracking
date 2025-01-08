import { routePaths } from "@/Routes";
import cookie from "@/utils/cookie";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import NavigationBar from "../common/NavigationBar";

const StudentView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie.accessToken.get()) {
      navigate(routePaths.signIn);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col-reverse lg:flex-row h-full p-2">
      <NavigationBar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentView;
