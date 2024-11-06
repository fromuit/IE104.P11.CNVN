import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/Home-page/Home-page.jsx';  
import InfoPage from '../components/Info-page/Info-page.jsx';
import AccountPage from '../components/Account-page/Account-page.jsx';
import SignUp from '../components/SignUp-page/SignUp.jsx';
import SighIn from '../components/SignIn-page/SignIn.jsx';

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/truyen/:slug",
    element: <InfoPage />,
  },
  {
    path: "/thanh-vien/:id",
    element: <AccountPage />,
  },
  {
    path: "/the-loai/:slug",
    element: <div>Nothing here</div>,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/info/:id",
    element: <InfoPage />,
  },

  {
    path: "*",
    element: <div>Not Found xdxd</div>,
  }
]);

export default AppRoutes;