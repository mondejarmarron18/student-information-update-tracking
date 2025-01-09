import { createBrowserRouter } from "react-router";
import SuspenseWrapper from "../components/layouts/SuspenseWrapper";
import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const SignIn = lazy(() => import("../pages/SignIn"));
const Register = lazy(() => import("../pages/Register"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const Address = lazy(() => import("../pages/Address"));
const StudentGuardian = lazy(() => import("../pages/StudentGuardian"));
const AcademicProfile = lazy(() => import("../pages/AcedemicProfile"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const StudentView = lazy(() => import("../components/layouts/StudentView"));
const EmailVerificationSent = lazy(
  () => import("../pages/EmailVerificationSent")
);
const Dashboard = lazy(() => import("../pages/Dashboard"));
const UserAccount = lazy(() => import("../pages/UserAccount"));

export const routePaths = {
  dashboard: "/dashboard",
  userAccount: "/user-account",
  signIn: "/",
  signUp: "/sign-up",
  emailVerificationSent: "/email-verification-sent",
  userProfile: "/user-profile",
  address: "/address",
  studentGuardian: "/student-guardian",
  academicProfile: "/academic-profile",
  forgotPassword: "/forgot-password",
} as const;

const publicRoutes = [
  {
    path: routePaths.signIn,
    element: SignIn,
  },
  {
    path: routePaths.signUp,
    element: Register,
  },
  {
    path: routePaths.emailVerificationSent,
    element: EmailVerificationSent,
  },
  {
    path: routePaths.forgotPassword,
    element: ForgotPassword,
  },
];

const privateRoutes = [
  {
    path: routePaths.userProfile,
    element: UserProfile,
  },
  {
    path: routePaths.address,
    element: Address,
  },
  {
    path: routePaths.studentGuardian,
    element: StudentGuardian,
  },
  {
    path: routePaths.academicProfile,
    element: AcademicProfile,
  },

  {
    path: routePaths.userAccount,
    element: UserAccount,
  },
  {
    path: routePaths.dashboard,
    element: Dashboard,
  },
];

const routes = createBrowserRouter([
  ...publicRoutes.map((route) => ({
    ...route,
    element: <PublicRoute>{SuspenseWrapper(route.element)}</PublicRoute>,
  })),
  {
    path: "/",
    element: <PrivateRoute>{SuspenseWrapper(StudentView)}</PrivateRoute>,
    children: privateRoutes.map((route) => ({
      ...route,
      element: SuspenseWrapper(route.element),
    })),
  },
]);

export default routes;
