import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/Home-page/Home-page.jsx';  
import InfoPage from '../components/Info-page/Info-page.jsx';
import AccountPage from '../components/Account-page/Account-page.jsx';

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
    path: "*",
    element: <div>Not Found xdxd</div>,
  }
]);

export default AppRoutes;