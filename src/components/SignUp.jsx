import React, { useContext, useState } from 'react';
import logo from "../../public/logo.png";
import '../components/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { LoginContext } from './context/Context';

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { setIsLogin } = useContext(LoginContext);

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const validateForm = () => {
    if (!name.trim()) {
      notifyA('Full name is required');
      return false;
    }

    if (!userName.trim()) {
      notifyA('Username is required');
      return false;
    }

    if (!email.trim()) {
      notifyA('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      notifyA('Please enter a valid email');
      return false;
    }

    if (!password.trim()) {
      notifyA('Password is required');
      return false;
    } else if (!passRegex.test(password)) {
      notifyA('Password must be at least 8 characters long, containing at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
      return false;
    }

    return true;
  };

  const handleSignUp = () => {
    if (!validateForm()) return;

    fetch("https://instagram-clone-backend-ncso.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        userName,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        notifyA('An error occurred while signing up. Please try again later.');
      });
  };

  const continueWithGoogle = (credentialResponse) => {
    console.log(credentialResponse);
    const jwtDetail = jwtDecode(credentialResponse.credential);
    console.log(jwtDetail);

    fetch("https://instagram-clone-backend-ncso.onrender.com/googleLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: jwtDetail.name,
        email: jwtDetail.email,
        userName: jwtDetail.given_name,  // Change to use given_name for username
        email_verified: jwtDetail.email_verified,
        clientId: credentialResponse.client_id,
        Photo: jwtDetail.picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setIsLogin(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        notifyA('An error occurred while signing up. Please try again later.');
      });
  }

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt="insta-logo" />
          <p className="loginPara">
            Sign up to see photos and videos <br /> from your friends.
          </p>
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Full name"
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              id="username"
              placeholder="User name"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
            />
          </div>
          <p className="loginPara" style={{ fontSize: '12px', margin: '3px 0px' }}>
            By signing up, you agree to our Terms, <br /> privacy policy, and cookies policy.
          </p>
          <input
            type="submit"
            id="submit-btn"
            value="Sign up"
            onClick={handleSignUp}
          />
          <hr />
          <GoogleLogin
            onSuccess={credentialResponse => {
              continueWithGoogle(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        <div className="form2">
          Already have an account?{' '}
          <Link to="/signin">
            <span style={{ color: 'blue', cursor: 'pointer' }}>Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
