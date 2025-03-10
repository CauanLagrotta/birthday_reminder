import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/router";
import { AuthContextProvider } from "./hooks/context";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
