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
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

export const routePaths = {
  signIn: "/",
  signUp: "/sign-up",
  userProfile: "/user-profile",
  address: "/address",
  studentGuardian: "/student-guardian",
  academicProfile: "/academic-profile",
  forgotPassword: "/forgot-password",
};

const routes = createBrowserRouter([
  {
    path: routePaths.signIn,
    element: SuspenseWrapper(SignIn),
  },
  {
    path: routePaths.signUp,
    element: SuspenseWrapper(Register),
    errorElement: <Error />,
  },
  {
    path: routePaths.userProfile,
    element: SuspenseWrapper(UserProfile),
  },
  {
    path: routePaths.address,
    element: SuspenseWrapper(Address),
  },
  {
    path: routePaths.studentGuardian,
    element: SuspenseWrapper(StudentGuardian),
  },
  {
    path: routePaths.academicProfile,
    element: SuspenseWrapper(AcademicProfile),
  },
  {
    path: routePaths.forgotPassword,
    element: SuspenseWrapper(ForgotPassword),
  },
]);

export default routes;
