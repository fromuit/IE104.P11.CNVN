import Signup from '../signup/signup.jsx';
import Login from '../login/login.jsx';

export const AuthPage = () => {
  return (
    <div>
      <div className='auth-container'>
       
       <p>Trước khi chạy server, cần chạy lệnh: npm install express fs path cors
        <br/>Chuyển tới thư mục server
        <br/>Sau đó chạy lệnh: node server.js
        <br/>Chuyển về thư mục src
        <br/>Sau đó ms chạy vite bt</p>
        <Signup />
       
        <Login />
      </div>
    </div>
  );
};

export default AuthPage;
