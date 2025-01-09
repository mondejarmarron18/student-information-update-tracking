import { Outlet } from "react-router";
import NavigationBar from "../common/NavigationBar";

const StudentView = () => {
  return (
    <div className="flex gap-2 lg:gap-4 flex-col-reverse lg:flex-row h-full p-2 lg:p-4">
      <NavigationBar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentView;
