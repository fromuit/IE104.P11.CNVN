
import { RouterProvider } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/routes.jsx';

const App = () => {
  return (
    <div className='app'>
      <RouterProvider router={AppRoutes} />
    </div>
  )
}

export default App
