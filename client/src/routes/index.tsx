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
const EmailVerification = lazy(() => import("../pages/EmailVerification"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const UserAccount = lazy(() => import("../pages/UserAccount"));
const UpdateRequest = lazy(() => import("../pages/UpdateRequest"));
const Conversations = lazy(() => import("../pages/Conversations"));

export const routePaths = {
  dashboard: {
    path: "/dashboard",
    name: "Dashboard",
    element: Dashboard,
  },
  userAccount: {
    path: "/user-account",
    name: "User Account",
    element: UserAccount,
  },
  signIn: {
    path: "/sign-in",
    name: "Sign In",
    element: SignIn,
  },
  signUp: {
    path: "/sign-up",
    name: "Sign Up",
    element: Register,
  },
  emailVerificationSent: {
    path: "/email-verification-sent",
    name: "Email Verification Sent",
    element: EmailVerificationSent,
  },
  emailVerification: {
    path: "/email-verification/:verificationCode",
    name: "Email Verification",
    element: EmailVerification,
  },
  userProfile: {
    path: "/personal-profile",
    name: "Personal Profile",
    element: UserProfile,
  },
  address: {
    path: "/address",
    name: "Address",
    element: Address,
  },
  studentGuardian: {
    path: "/student-guardian",
    name: "Student Guardian",
    element: StudentGuardian,
  },
  academicProfile: {
    path: "/academic-profile",
    name: "Academic Profile",
    element: AcademicProfile,
  },
  forgotPassword: {
    path: "/forgot-password",
    name: "Forgot Password",
    element: ForgotPassword,
  },
  updateRequests: {
    path: "/update-requests",
    name: "Update Requests",
    element: UpdateRequest,
  },
  conversations: {
    path: "/conversations",
    name: "Conversations",
    element: Conversations,
  },
} as const;

const publicRoutes = [
  routePaths.signIn,
  routePaths.signUp,
  routePaths.forgotPassword,
  routePaths.emailVerification,
  routePaths.emailVerificationSent,
];

const privateRoutes = [
  routePaths.dashboard,
  routePaths.userAccount,
  routePaths.userProfile,
  routePaths.address,
  routePaths.studentGuardian,
  routePaths.academicProfile,
  routePaths.updateRequests,
  routePaths.conversations,
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
