import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ProviderActions } from "./providers/ActionsProvider.tsx";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);
root.render(
  <BrowserRouter>
    <Suspense fallback={<div className="loadPageMain">Loading...</div>}>
      <ProviderActions>
        <Layout>
          <App />
        </Layout>
      </ProviderActions>
    </Suspense>
  </BrowserRouter>
);
