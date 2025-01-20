import { createBrowserRouter } from "react-router";
import SuspenseWrapper from "../components/layouts/SuspenseWrapper";
import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const routePaths = {
  dashboard: {
    path: "/dashboard",
    name: "Dashboard",
    element: lazy(() => import("../pages/Dashboard")),
  },
  userAccount: {
    path: "/user-account",
    name: "User Account",
    element: lazy(() => import("../pages/UserAccount")),
  },
  signIn: {
    path: "/sign-in",
    name: "Sign In",
    element: lazy(() => import("../pages/SignIn")),
  },
  signUp: {
    path: "/sign-up",
    name: "Sign Up",
    element: lazy(() => import("../pages/Register")),
  },
  emailVerificationSent: {
    path: "/email-verification-sent",
    name: "Email Verification Sent",
    element: lazy(() => import("../pages/EmailVerificationSent")),
  },
  emailVerification: {
    path: "/email-verification/:verificationCode",
    name: "Email Verification",
    element: lazy(() => import("../pages/EmailVerification")),
  },
  userProfile: {
    path: "/personal-profile",
    name: "Personal Profile",
    element: lazy(() => import("../pages/UserProfile")),
  },
  address: {
    path: "/address",
    name: "Address",
    element: lazy(() => import("../pages/Address")),
  },
  studentGuardian: {
    path: "/student-guardian",
    name: "Student Guardian",
    element: lazy(() => import("../pages/StudentGuardian")),
  },
  academicProfile: {
    path: "/academic-profile",
    name: "Academic Profile",
    element: lazy(() => import("../pages/AcedemicProfile")),
  },
  forgotPassword: {
    path: "/forgot-password",
    name: "Forgot Password",
    element: lazy(() => import("../pages/ForgotPassword")),
  },
  updateRequests: {
    path: "/update-requests",
    name: "Update Requests",
    element: lazy(() => import("../pages/UpdateRequests")),
  },
  updateRequest: {
    path: "/:updateRequestId",
    name: "Update Request",
    element: lazy(() => import("../pages/UpdateRequest")),
  },
  conversations: {
    path: "/conversations",
    name: "Conversations",
    element: lazy(() => import("../pages/Conversations")),
  },
  auditLogs: {
    path: "/audit-logs",
    name: "Audit Logs",
    element: lazy(() => import("../pages/AuditLogs")),
  },
  passwordReset: {
    path: "/password-reset/:verificationCode",
    name: "Password Reset",
    element: lazy(() => import("../pages/PasswordReset")),
  },
  academicInfoMgmt: {
    path: "/academic-information-management",
    name: "Academic Information Management",
    element: lazy(() => import("../pages/AcademicInfoMgmt")),
  },
} as const;

const publicRoutes = [
  routePaths.signIn,
  routePaths.signUp,
  routePaths.forgotPassword,
  routePaths.emailVerification,
  routePaths.emailVerificationSent,
  routePaths.passwordReset,
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
  routePaths.auditLogs,
  routePaths.academicInfoMgmt,
  {
    ...routePaths.updateRequest,
    path: routePaths.updateRequests.path + routePaths.updateRequest.path,
  },
];

const routes = createBrowserRouter([
  ...publicRoutes.map((route) => ({
    ...route,
    element: <PublicRoute>{SuspenseWrapper(route.element)}</PublicRoute>,
  })),
  {
    path: "/",
    element: (
      <PrivateRoute>
        {SuspenseWrapper(
          lazy(() => import("../components/layouts/StudentView"))
        )}
      </PrivateRoute>
    ),
    children: privateRoutes.map((route) => ({
      ...route,
      element: SuspenseWrapper(route.element),
    })),
  },
]);

export default routes;
