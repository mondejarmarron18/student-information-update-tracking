import { RouterProvider } from "react-router";
import routes from "./routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AccessTokenProvider } from "./contexts/acessTokenContext";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessTokenProvider>
        <RouterProvider router={routes} />
        <Toaster  />
      </AccessTokenProvider>
    </QueryClientProvider>
  );
}

export default App;
