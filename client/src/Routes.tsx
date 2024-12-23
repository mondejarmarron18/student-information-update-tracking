import { createBrowserRouter } from "react-router";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import UserProfile from "./pages/UserProfile";
import Address from "./pages/Address";
import StudentGuardian from "./pages/StudentGuardian";
import AcademicProfile from "./pages/AcedemicProfile";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <div>404</div>,
  },
  {
    path: "/user-profile",
    element: <UserProfile />,
  },
  {
    path: "/address",
    element: <Address />,
  },
  {
    path: "/student-guardian",
    element: <StudentGuardian />,
  },
  {
    path: "/academic-profile",
    element: <AcademicProfile />,
  },
]);

export default routes;
