import {
  createBrowserRouter,
} from "react-router-dom";
import MainPage from "../pages/main_page.jsx";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);
