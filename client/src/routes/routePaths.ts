import { lazy, LazyExoticComponent } from "react";

type RoutePath = {
  path: string;
  name: string;
  element: LazyExoticComponent<() => JSX.Element>;
};

const routePaths: Record<string, RoutePath> = {
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
    path: "/update-requests/:updateRequestId",
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
  programsSpecializations: {
    path: "/programs-specializations",
    name: "Programs and Specializations",
    element: lazy(() => import("../pages/ProgramsSpecializations")),
  },
  course: {
    path: "/programs-specializations/:courseId",
    name: "Course",
    element: lazy(() => import("../pages/Course")),
  },
  specializations: {
    path: "/programs-specializations/:courseId/specializations",
    name: "Specializations",
    element: lazy(() => import("../pages/Specializations")),
  },
  specialization: {
    path: "/programs-specializations/:courseId/specializations/:specializationId",
    name: "Specialization",
    element: lazy(() => import("../pages/Specialization")),
  },
} as const;

export default routePaths;
