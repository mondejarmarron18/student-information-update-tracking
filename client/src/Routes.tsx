import { createBrowserRouter } from "react-router";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

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

    loader: async () => {
      return import("./pages/Register");
    },
  },
]);

export default routes;
