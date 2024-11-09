import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../components/Home-page/Home-page.jsx';  
import InfoPage from '../components/Info-page/Info-page.jsx';
import AccountPage from '../components/Account-page/Account-page.jsx';
import SignUp from '../components/SignUp-page/SignUp.jsx';
import SignIn from '../components/SignIn-page/SignIn.jsx';
import AdvancedSearch from '../components/Advanced-Search/AdvancedSearch.jsx';

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/info/:id",
    element: <InfoPage />,
  },
  {
    path: "/thanh-vien/:id",
    element: <AccountPage />,
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
    path: "/tim-kiem-nang-cao",
    element: <AdvancedSearch />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  }
]);

export default AppRoutes;