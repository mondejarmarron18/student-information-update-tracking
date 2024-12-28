import { RouterProvider } from "react-router";
import routes from "./Routes";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate as ReduxPersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <ReduxProvider store={store}>
      <ReduxPersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
      </ReduxPersistGate>
    </ReduxProvider>
  );
}

export default App;
