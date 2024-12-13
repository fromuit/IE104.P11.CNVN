import { RouterProvider } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AppRoutes from './routes/routes';
import './App.css';

function App() {
  return (
    <div className="app">
      <RouterProvider router={AppRoutes} />
    </div>
  );
}

export default App;