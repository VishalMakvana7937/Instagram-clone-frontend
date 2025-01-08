import React, { useEffect, useState } from 'react';
import '../components/Profile.css';
import PostDetails from './PostDetails';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
    const { userid } = useParams();
    console.log(userid);

    const [isFollow, setisFollow] = useState(false);

    const [user, setUser] = useState("");
    const [post, setPost] = useState([]);


    //   const toggleDetails = (posts) => {
    //     if (show) {
    //       setShow(false)
    //     } else {
    //       setShow(true)
    //       setPost(posts);
    //       console.log(post);

    //     }
    //   }

    const followUser = (userid) => {
        console.log(userid);
        fetch('https://instagram-clone-backend-ncso.onrender.com/follow', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({ followId: userid })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setisFollow(true);
            })
    }

    const unfollowUser = (userid) => {
        console.log(userid);
        fetch('https://instagram-clone-backend-ncso.onrender.com/unfollow', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({ followId: userid })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setisFollow(false);
            })
    }

    useEffect(() => {
        fetch(`https://instagram-clone-backend-ncso.onrender.com/user/${userid}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setUser(result.user)
                setPost(result.post)
                if (
                    result.user.followers.includes(
                        JSON.parse(localStorage.getItem("user"))._id
                    )
                ) {
                    setisFollow(true);
                }
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, [isFollow]);

    return (
        <div className="profile">
            <div className="profile-frame">
                <div className="profile-pic">
                    <img
                        src={user.photo ? user.photo : picLink}
                    />
                </div>

                <div className="profile-data">
                    <div >
                        <h2>{user.name}</h2>
                        <button className='followBtn' onClick={() => { if (isFollow) { unfollowUser(user._id) } else { followUser(user._id) } }}>{isFollow ? "Unfollow" : "Follow"}</button>
                    </div>
                    <div className="profile-info" style={{ display: "flex" }}>
                        <p>{post.length} post</p>
                        <p>{user.followers ? user.followers.length : 0} followers</p>
                        <p>{user.followers ? user.following.length : 0} following</p>
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
                {Array.isArray(post) && post.length > 0 ? (
                    post.map((pic) => (
                        <img
                            key={pic._id}
                            src={pic.photo}
                            className="item"
                            alt="profile_img"
                        // If you need to show post details, uncomment toggleDetails function
                        // onClick={() => toggleDetails(pic)}
                        />
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>

            {/* {
        show && (
          <PostDetails item={post} toggleDetails={toggleDetails} />
        )
      } */}
        </div>
    );
};

export default UserProfile;
