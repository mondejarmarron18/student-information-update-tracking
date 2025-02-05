import { role } from "@/constants/role";
import { lazy, LazyExoticComponent } from "react";

export type RoutePath = {
  path: string;
  name: string;
  element: LazyExoticComponent<() => JSX.Element>;
  roles?: (typeof role)[keyof typeof role][];
};

const routePaths: Record<string, RoutePath> = {
  dashboard: {
    path: "/",
    name: "Dashboard",
    element: lazy(() => import("../pages/Dashboard")),
  },
  userAccounts: {
    path: "/user-accounts",
    name: "User Accounts",
    element: lazy(() => import("../pages/UserAccounts")),
    roles: [role.SUPER_ADMIN, role.ADMIN],
  },
  userAccount: {
    path: "/user-accounts/:userAccountId",
    name: "User Account",
    element: lazy(() => import("../pages/UserAccount")),
    roles: [role.SUPER_ADMIN, role.ADMIN],
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
    name: "Personal Information",
    element: lazy(() => import("../pages/UserProfile")),
  },
  academicProfile: {
    path: "/academic-profile",
    name: "Academic Profile",
    element: lazy(() => import("../pages/AcedemicProfile")),
    roles: [role.STUDENT],
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
    roles: [role.ADMIN, role.STAFF],
  },
  passwordReset: {
    path: "/password-reset/:verificationCode",
    name: "Password Reset",
    element: lazy(() => import("../pages/PasswordReset")),
  },
  academicManagement: {
    path: "/academic-management",
    name: "Academic Management",
    element: lazy(() => import("../pages/AcademicManagement")),
    roles: [role.ADMIN, role.STAFF],
  },
  course: {
    path: "/academic-management/:courseId",
    name: "Course",
    element: lazy(() => import("../pages/Course")),
    roles: [role.ADMIN, role.STAFF],
  },
  specializations: {
    path: "/academic-management/:courseId/specializations",
    name: "Specializations",
    element: lazy(() => import("../pages/Specializations")),
    roles: [role.ADMIN, role.STAFF],
  },
  specialization: {
    path: "/academic-management/:courseId/specializations/:specializationId",
    name: "Specialization",
    element: lazy(() => import("../pages/Specialization")),
    roles: [role.ADMIN, role.STAFF],
  },
  accountManagement: {
    path: "/account-management",
    name: "Account Management",
    element: lazy(() => import("../pages/AccountManagement")),
  },
  announcements: {
    path: "/announcements",
    name: "Announcements",
    element: lazy(() => import("../pages/Announcements")),
  },
} as const;

export default routePaths;
