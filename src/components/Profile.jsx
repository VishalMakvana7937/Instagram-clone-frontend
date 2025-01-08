import React, { useEffect, useState } from 'react';
import '../components/Profile.css';
import PostDetails from './PostDetails';
import ProfilePic from './ProfilePic';

const Profile = () => {

  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";

  const [profile, setProfile] = useState([]);
  const [show, setShow] = useState(false);
  const [post, setPost] = useState([]);
  const [changePic, setChangePic] = useState(false);
  const [user, setUser] = useState("");


  const toggleDetails = (posts) => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
      setPost(posts);
      console.log(post);

    }
  }

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false)
    } else {
      setChangePic(true)
    }
  }


  useEffect(() => {
    fetch(`https://instagram-clone-backend-ncso.onrender.com/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result.post);
        setUser(result.user)
        console.log(result);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            onClick={() => { changeprofile() }}
            src={user.photo ? user.photo : picLink}
            alt="profile_img"
          />
        </div>

        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{ display: "flex" }}>
            <p>{profile ? profile.length : 0} posts</p>
            <p>{user.followers ? user.followers.length : 0} followers</p>
            <p>{user.following ? user.following.length : 0} following</p>
          </div>
        </div>
      </div>

      <hr
        style={{
          width: "90%",
          opacity: "0.8",
          margin: "25px auto",
        }}
      />

      <div className="gallery">
        {Array.isArray(profile) &&
          profile.map((pic) => (
            <img
              key={pic._id}
              src={pic.photo}
              className="item"
              alt="profile_img"
              onClick={() => { toggleDetails(pic) }}
            />
          ))}
      </div>

      {
        show && (
          <PostDetails item={post} toggleDetails={toggleDetails} />
        )
      }
      {
        changePic && (
          <ProfilePic changeprofile={changeprofile} />
        )
      }
    </div>
  );
};

export default Profile;
