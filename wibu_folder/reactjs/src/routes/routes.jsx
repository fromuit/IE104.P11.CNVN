import { createBrowserRouter } from 'react-router-dom';
import MainPage from "../pages/main_page.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);
