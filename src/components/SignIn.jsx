import React, { useContext, useState } from 'react';
import '../components/SignIn.css';
import logo from "../../public/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from './context/Context';

const SignIn = () => {

  const { setIsLogin } = useContext(LoginContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      notifyA("Invalid email")
      return
    }

    fetch("https://instagram-clone-backend-ncso.onrender.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          console.log(data);
          console.log("My token..!", data.token);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setIsLogin(true);
          navigate("/");
        }
      })
      .catch(error => {
        notifyA("Something went wrong. Please try again later.");
        console.error("Error during sign in:", error);
      });
  };

  return (
    <div className='signIn'>
      <div>
        <div className="loginForm">
          <img className='signUpLogo' src={logo} alt="insta-logo" />
          <div>
            <input
              type="email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              placeholder='Email'
            />
          </div>
          <div>
            <input
              type="password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id='password'
              placeholder='Password'
            />
          </div>
          <input
            type="submit"
            id='login-btn'
            value="Sign In"
            onClick={handleSignIn}
          />
        </div>
        <div className="loginForm2">
          Don't have an account?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
