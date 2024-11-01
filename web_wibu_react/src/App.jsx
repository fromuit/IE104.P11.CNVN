
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import router from './Routers/routes';
import './App.css';

function App() {
  return (
      <div className="app">
        <RouterProvider router={router} />
      </div>

  );
}

export default App;