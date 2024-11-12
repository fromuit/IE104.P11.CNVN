import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home-page/Home-page.jsx';  
import InfoPage from '../pages/Info-page/Info-page.jsx';
import AccountPage from '../pages/Account-page/Account-page.jsx';
import SignUp from '../pages/SignUp-page/SignUp.jsx';
import SignIn from '../pages/SignIn-page/SignIn.jsx';
import AdvancedSearch from '../features/Advanced-Search/AdvancedSearch.jsx';
import GenresPage from '../pages/Genres-page/Genres-page.jsx';

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
    path: "/the-loai/:slug",
    element: <GenresPage />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  }
]);

export default AppRoutes;