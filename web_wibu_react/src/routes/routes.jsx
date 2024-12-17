import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home-page/Home-page.jsx';  
import InfoPage from '../pages/Info-page/Info-page.jsx';
import AccountPage from '../pages/Account-page/Account-page.jsx';
import SignUp from '../pages/SignUp-page/SignUp.jsx';
import SignIn from '../pages/SignIn-page/SignIn.jsx';
import AdvancedSearch from '../features/Advanced-Search/AdvancedSearch.jsx';
import GenresPage from '../pages/Genres-page/Genres-page.jsx';
import TopNovelsPage from '../pages/Home-page/Main-of-Home/See_More/TopNovels-page.jsx';
import RecentlyUpdatedPage from '../pages/Home-page/Main-of-Home/See_More/RecentlyUpdated-page.jsx';
import NewNovelsPage from '../pages/Home-page/Main-of-Home/See_More/NewNovels-page.jsx';
import CompletedNovelsPage from '../pages/Home-page/Main-of-Home/See_More/CompletedNovels-page.jsx';
import OriginalNovelsPage from '../pages/Home-page/Main-of-Home/See_More/OriginalNovels-page.jsx';

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
    path: "/top-truyen",
    element: <TopNovelsPage />,
  },
  {
    path: "/moi-cap-nhat",
    element: <RecentlyUpdatedPage />,
  },
  {
    path: "/truyen-moi",
    element: <NewNovelsPage />,
  },
  {
    path: "/truyen-da-hoan-thanh",
    element: <CompletedNovelsPage />,
  },
  {
    path: "/truyen-sang-tac", 
    element: <OriginalNovelsPage />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  }
]);

export default AppRoutes;