import React, { useEffect, useState } from 'react'
import '../components/Home.css'
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom'


const MyFollowing = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState(false);
    const [item, setItem] = useState([]);

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);


    useEffect(() => {
        const token = localStorage.getItem('jwt')

        if (!token) {
            navigate("/signup");
        }

        fetch("https://instagram-clone-backend-ncso.onrender.com/myfollowing/post", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => setData(result))
            .catch(err => console.log(err))

    }, []);

    const toggleComment = (posts) => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
            setItem(posts);
            console.log(item);

        }
    }

    const likePost = (id) => {
        fetch("https://instagram-clone-backend-ncso.onrender.com/like", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then((result) => {
                const newData = data.map((posts) => {
                    if (posts._id == result._id) {
                        return result
                    } else {
                        return posts
                    }
                })
                setData(newData)
                console.log(result)
            })
    }

    const unlikePost = (id) => {
        fetch("https://instagram-clone-backend-ncso.onrender.com/unlike ", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then((result) => {
                const newData = data.map((posts) => {
                    if (posts._id == result._id) {
                        return result
                    } else {
                        return posts
                    }
                })
                setData(newData)
                console.log(result)
            })
    }

    const makecomment = (text, id) => {
        fetch("https://instagram-clone-backend-ncso.onrender.com/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                text: text,
                postId: id,
            }),
        }).then(res => res.json())
            .then((result) => {
                const newData = data.map((posts) => {
                    if (posts._id == result._id) {
                        return result
                    } else {
                        return posts
                    }
                })
                setData(newData)
                setComment("");
                notifyB(" Comment posted successfully")
                console.log(result)
            })
    }

    return (
        <div className="home">
            {data.map((post) => (
                <div className="card" key={post._id}>
                    <div className="card-header">
                        <div className="card-pic">
                            <img
                                src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                                alt="profile_img"
                            />
                        </div>
                        <h5><Link to={`/profile/${post.postedBy._id}`}>
                            {post.postedBy.name}
                        </Link></h5>
                    </div>

                    <div className="card-image">
                        <img src={post.photo} alt="post-img" />
                    </div>

                    <div className="card-content">
                        {post.likes.includes(JSON.parse(localStorage.getItem('user'))._id) ? (
                            <span id="FaRegHeart_icon" onClick={() => unlikePost(post._id)}>
                                <FaHeart color="red" />
                            </span>
                        ) : (
                            <span onClick={() => likePost(post._id)}>
                                <FaRegHeart />
                            </span>
                        )}
                        <p>{post.likes.length} Likes</p>
                        <p>{post.body}</p>
                        <p
                            style={{ fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => toggleComment(post)}
                        >
                            View all comments
                        </p>
                    </div>

                    <div className="add-comment">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="comment"
                            onClick={() => {
                                makecomment(comment, post._id);
                            }}
                        >
                            Post
                        </button>
                    </div>
                </div>
            ))}

            {show && item && (
                <div className="showComment">
                    <div className="container">
                        <div className="postPic">
                            <img src={item.photo} alt="comment_pic" />
                        </div>
                        <div className="details">
                            <div className="card-header">
                                <div className="card-pic">
                                    <img
                                        src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                                        alt="profile_img"
                                    />
                                </div>
                                <h5>
                                    {item.postedBy.name}
                                </h5>
                            </div>

                            <div className="comment-section">
                                {item.comments.map((comment, index) => (
                                    <p className="comm" key={index}>
                                        <span className="commenter" style={{ fontWeight: 'bold' }}>
                                            {comment.postedBy.name}{' '}
                                        </span>
                                        <span className="commentText">{comment.comment}</span>
                                    </p>
                                ))}
                            </div>
                            <div className="card-content">
                                <p>{item.likes.length} Likes</p>
                                <p>{item.body}</p>
                            </div>
                            <div className="add-comment">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button
                                    className="comment"
                                    onClick={() => {
                                        makecomment(comment, item._id);
                                        toggleComment();
                                    }}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                    <span className="close-comment" onClick={() => toggleComment()}>
                        <IoCloseSharp />
                    </span>
                </div>
            )}
        </div>
    )
}

export default MyFollowing