import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function Secret() {
    const generateError = (err) => {
        toast.error(err, {
            position: 'bottom-right'
        })
    }
    const navigate = useNavigate();
    const logOut = async () => {
        try {
            const result = await axios.post('http://localhost:4000/logout',
                {}, { withCredentials: true }
            );
            const errorStatus = [205, 204]
            if (errorStatus.includes(result.status)) {
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    generateError(error.response.statusText);
                }
            } else {
                console.log('Network error:', error.message);
            }
        }
    }
    return (<>
        <div className='private'>
            <h1>Secret Page</h1>
            <button onClick={logOut}>Log Out</button>
        </div>
        <ToastContainer />
    </>
    );
}