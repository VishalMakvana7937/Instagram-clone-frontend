import React from 'react'
import '../components/PostDetails.css'
import { IoCloseSharp, IoTrashBinSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostDetails = ({ item, toggleDetails }) => {

  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const deletPost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      fetch(`https://instagram-clone-backend-ncso.onrender.com/deletePost/${postId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          toggleDetails();
          navigate('/');
          notifyB('Post deleted successfully');
        })
    }
  }

  return (
    <div className="home">
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
              <h5>{item.postedBy.name}</h5>

              <button
                className="top-right-icon"
                onClick={() => deletPost(item._id)}
              >
                <IoTrashBinSharp />
              </button>
            </div>

            <div className="comment-section">
              {item.comments.map((comment, index) => (
                <div className="comment" key={index}>
                  <p>
                    <span className="commenter" style={{ fontWeight: 'bold' }}>
                      {comment.postedBy.name}
                    </span>
                    <span className="commentText">{comment.comment}</span>  
                  </p>
                </div>
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
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
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
        <span className="close-comment" onClick={() => toggleDetails()}>
          <IoCloseSharp />
        </span>
      </div>
    </div>

  )
}

export default PostDetails