import { router } from './routes/routes.jsx';
import { RouterProvider } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
