import AuthPage from '../components/main_page/AuthPage';
import Signup from '../components/signup/signup.jsx';
import Login from '../components/login/login.jsx';
import {
  createBrowserRouter,
} from "react-router-dom";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
  },
  // Các routes khác của bạn
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:"*",
    element: <div>Not Found</div>,
  }
]);

export default AppRoutes;
