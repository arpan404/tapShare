import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
const NotFound = lazy(() => import("./pages/404"));
export default function App() {
  registerSW();
  <BrowserRouter>
    <Suspense fallback={"loading"}>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>;
}
