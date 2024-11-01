import {
  createBrowserRouter,
} from "react-router-dom";
import MainPage from "../pages/main_page";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

export default AppRoutes;
