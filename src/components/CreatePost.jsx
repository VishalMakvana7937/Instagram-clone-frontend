import React, { useEffect, useState } from 'react';
import '../components/CreatePost.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [body, setBody] = useState('');
    const [img, setImg] = useState('');
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    useEffect(() => {
        if (url) {
            // Save post to MongoDB
            fetch("https://instagram-clone-backend-ncso.onrender.com/createPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    body,
                    pic: url
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error);
                    } else {
                        notifyB("Successfully Posted");
                        navigate("/");
                    }
                })
                .catch(err => {
                    console.log(err);
                    notifyA("Error creating post");
                });
        }
    }, [url]);

    const postDetails = () => {
        console.log(body, img);
        const data = new FormData();
        data.append('file', img);
        data.append('upload_preset', 'insta-clone');
        data.append('cloud_name', 'xyzvishal');

        fetch("https://api.cloudinary.com/v1_1/xyzvishal/image/upload", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if (data.url) {
                    console.log(data.url);
                    setUrl(data.url);
                } else {
                    notifyA("Error uploading image");
                }
            })
            .catch(err => {
                console.log(err);
                notifyA("Error uploading image");
            });
    };

    const loadfile = (event) => {
        const output = document.getElementById("output");
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src);
        };
        setImg(event.target.files[0]);
    };

    return (
        <div className='createPost'>
            <div className='post-header'>
                <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
                <button id='post-btn' onClick={postDetails}>Share</button>
            </div>
            <div className="main-div">
                <img id='output' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' alt="Preview" />
                <input type="file" accept='image/*' onChange={loadfile} />
            </div>
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png" alt="profile_img" />
                    </div>
                    <h5>Ramesh</h5>
                </div>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder='Write a caption...'
                />
            </div>
        </div>
    );
};

export default CreatePost;
