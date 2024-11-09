import { RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/routes';

import './App.css';
// Chưa có thì npm install @fortawesome/fontawesome-free
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="app">
      <RouterProvider router={AppRoutes} />
    </div>
  );
}

export default App;