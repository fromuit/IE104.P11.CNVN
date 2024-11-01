import Signup from '../signup/signup.jsx';
import Login from '../login/login.jsx';

export const AuthPage = () => {
  return (
    <div>
      <div className='auth-container'>
       
        <Signup />
       
        <Login />
      </div>
    </div>
  );
};

export default AuthPage;
