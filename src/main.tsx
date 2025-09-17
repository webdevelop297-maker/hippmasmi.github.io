import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
<HelmetProvider>
  <App />
</HelmetProvider>

createRoot(document.getElementById("root")!).render(<App />);
