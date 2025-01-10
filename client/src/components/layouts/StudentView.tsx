import { Outlet } from "react-router";
import NavigationBar from "../common/NavigationBar";
import Header from "../common/Header";

const StudentView = () => {
  return (
    <div className="flex gap-2 lg:gap-4 flex-col-reverse lg:flex-row h-full p-2 lg:p-4">
      <NavigationBar />
      <div className="flex-1 flex flex-col gap-2 lg:gap-4 overflow-hidden">
        <Header />
        <div className="flex-1 h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentView;
