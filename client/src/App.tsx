import { RouterProvider } from "react-router";
import routes from "./Routes";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

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
      <ReduxProvider store={store}>
        <RouterProvider router={routes} />
      </ReduxProvider>
    </QueryClientProvider>
  );
}

export default App;
