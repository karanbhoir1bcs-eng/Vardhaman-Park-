import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import NotFound from "./components/NotFound";

const path = window.location.pathname;
const isHome = path === "/" || path === "/index.html";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isHome ? <App /> : <NotFound />}
  </StrictMode>,
);
