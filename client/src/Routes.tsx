import { createBrowserRouter } from "react-router";
import SuspenseWrapper from "./components/layouts/SuspenseWrapper";
import { lazy } from "react";
import Error from "./pages/Error";

const SignIn = lazy(() => import("./pages/SignIn"));
const Register = lazy(() => import("./pages/Register"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Address = lazy(() => import("./pages/Address"));
const StudentGuardian = lazy(() => import("./pages/StudentGuardian"));
const AcademicProfile = lazy(() => import("./pages/AcedemicProfile"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: SuspenseWrapper(SignIn),
  },
  {
    path: "/sign-up",
    element: SuspenseWrapper(Register),
    errorElement: <Error />,
  },
  {
    path: "/user-profile",
    element: SuspenseWrapper(UserProfile),
  },
  {
    path: "/address",
    element: SuspenseWrapper(Address),
  },
  {
    path: "/student-guardian",
    element: SuspenseWrapper(StudentGuardian),
  },
  {
    path: "/academic-profile",
    element: SuspenseWrapper(AcademicProfile),
  },
]);

export default routes;
