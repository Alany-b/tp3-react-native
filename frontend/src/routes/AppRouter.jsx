import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { InitPage } from "../pages/InitPage";
import { NotesPage } from "../pages/NotesPage";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<InitPage />} />
          <Route path="/register" element={<InitPage />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
