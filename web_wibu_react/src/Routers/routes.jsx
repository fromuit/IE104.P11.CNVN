

import {
  createBrowserRouter,
} from "react-router-dom";

import FirstPage from "../pages/first_page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "/login",
    element: <h1>Hello</h1>
  },
  {
    path: "*",
    element: <h1>Not Found</h1>
  }

]);


export default router;
