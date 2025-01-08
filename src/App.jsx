import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Profile from './components/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './components/CreatePost'
import { LoginContext } from './components/context/Context'
import { useState } from 'react'
import Model from './components/Model'
import UserProfile from './components/UserProfile'
import MyFollowing from './components/MyFollowing'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [moalOpen, setMoalOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <GoogleOAuthProvider clientId="955102643932-bqg1fdotq9mndgdu3e6utk4se8juie0b.apps.googleusercontent.com">
            <LoginContext.Provider value={{ setIsLogin, setMoalOpen }}>
              <Navbar login={isLogin} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route path="/createPost" element={<CreatePost />} />
                <Route path="/following/post" element={<MyFollowing />} />
                <Route path="/profile/:userid" element={<UserProfile />} />
              </Routes>
              <ToastContainer theme='dark' />
              {/* <Model /> */}
              {
                moalOpen && <Model setMoalOpen={setMoalOpen} />
              }
            </LoginContext.Provider>
          </GoogleOAuthProvider>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App
