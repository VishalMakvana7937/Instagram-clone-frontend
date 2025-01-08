import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

const ProfilePic = ({ changeprofile }) => {

    const [img, setImg] = useState('');
    const [url, setUrl] = useState("");

    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg)

    const hiiddenFile = useRef(null);

    const handelclick = () => {
        hiiddenFile.current.click();
    }

    const postDetails = () => {
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

    const postpic = () => {
        fetch("https://instagram-clone-backend-ncso.onrender.com/uploadprofilepic", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                pic: url
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                changeprofile();
                window.location.reload();

            })
            .catch(err => {
                console.log(err);
                notifyA("Error creating post");
            });

    }

    useEffect(() => {
        if (img) {
            postDetails();
        }
    }, [img])

    useEffect(() => {
        if (url) {
            postpic();
        }
    }, [url])

    return (
        <div className='profilePic darkBg'>
            <div className='chnagepic centered'>
                <div>
                    <h2>
                        Change Profile Picture
                    </h2>
                </div>
                <div style={{ color: "#1ea1f7", borderTop: "1px solid #00000030" }}>
                    {/* Fix: Passing the function reference instead of calling it */}
                    <button className='upload-btn' style={{ color: "#1ea1f7" }} onClick={handelclick}>Upload Photo</button>
                    <input type="file" ref={hiiddenFile} accept='image/*' style={{ display: "none" }} onChange={(e) => { setImg(e.target.files[0]) }} />
                </div>
                <div style={{ color: "#1ea1f7", borderTop: "1px solid #00000030" }}>
                    <button className='upload-btn' style={{ color: "#ec4956" }} onClick={() => {setUrl(null);postpic()}}>Remove current Photo</button>
                </div>
                <div style={{ color: "#1ea1f7", borderTop: "1px solid #00000030" }}>
                    <button style={{ background: "none", border: "none", color: "#1ea1f7", cursor: "pointer", fontSize: "15px" }} onClick={() => { changeprofile() }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePic
