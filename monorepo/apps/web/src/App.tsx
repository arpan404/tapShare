import { lazy, Suspense, StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import { registerSW } from "virtual:pwa-register";
const NotFound = lazy(() => import("./pages/404"));
export default function App() {
  // registerSW();
  return (
    <BrowserRouter>
      <Suspense fallback={"loading"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
