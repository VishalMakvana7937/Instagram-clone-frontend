import React from 'react'
import { RiCloseLine } from "react-icons/ri";
import '../components/Model.css'
import { useNavigate } from 'react-router-dom';

const Model = ({ setMoalOpen }) => {

    const navigate = useNavigate();

    return (
        <div className='darkBg' onClick={() => setMoalOpen(false)}>
            <div className='centered'>
                <div className='modal'>
                    <div className='modalHeader'>
                        <h5 className='heading'>Confirm</h5>
                    </div>
                    <button className='closeBtn' onClick={() => setMoalOpen(false)}>
                        <RiCloseLine />
                    </button>

                    <div className='modalContent'>
                        Are you really want to log out?
                    </div>

                    <div className='modalActions'>
                        <div className='actionsContainer'>
                            <button className='logOutBtn' onClick={() => { setMoalOpen(false); localStorage.clear(); navigate('/SignIn') }}>Log out</button>
                            <button className='cancelBtn' onClick={() => setMoalOpen(false)}> Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model