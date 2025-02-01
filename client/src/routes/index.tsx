import { createBrowserRouter } from "react-router";
import SuspenseWrapper from "../components/layouts/SuspenseWrapper";
import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import _routePaths from "./routePaths";
import NotFound from "@/pages/NotFound";
import ResourceError from "@/components/common/ResourceError";

export const routePaths = _routePaths;

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
  routePaths.academicProfile,
  routePaths.updateRequests,
  routePaths.updateRequest,
  routePaths.conversations,
  routePaths.auditLogs,
  routePaths.academicManagement,
  routePaths.course,
  routePaths.specializations,
  routePaths.specialization,
  routePaths.accountManagement,
  routePaths.userAccounts,
];

const routes = createBrowserRouter([
  ...publicRoutes.map((route) => ({
    ...route,
    element: <PublicRoute>{SuspenseWrapper(route.element)}</PublicRoute>,
    errorElement: <ResourceError />,
  })),
  {
    path: "/",
    element: (
      <PrivateRoute>
        {SuspenseWrapper(
          lazy(() => import("../components/layouts/PageWrapper"))
        )}
      </PrivateRoute>
    ),
    children: privateRoutes.map((route) => ({
      ...route,
      element: SuspenseWrapper(route.element),
      errorElement: <ResourceError />,
    })),
  },

  {
    path: "*",
    element: <NotFound />,
    errorElement: <ResourceError />,
  },
]);

export default routes;
