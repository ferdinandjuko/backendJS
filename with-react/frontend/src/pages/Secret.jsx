import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import axios from 'axios';


export default function Secret() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        let isMounted = true; // ✅ guard against double execution

        const verifyUser = async () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                navigate('/login');
            } else { // check the reliability of your token
                try {
                    const { data } = await axios.post('http://localhost:4000',
                        {},
                        {
                            withCredentials: true,
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })

                    if (!isMounted) return; // ✅ don't update if unmounted
                    if (!data.status) {
                        localStorage.removeItem('jwt');
                        navigate('/login');
                    } else toast(`Hi ${data.user}`, { theme: 'dark' });
                } catch (error) {
                    console.log(error);
                }
            }
        }
        verifyUser();

        return () => { isMounted = false; } // ✅ cleanup on unmount
    }, [])
    const generateError = (err) => {
        toast.error(err, {
            position: 'bottom-right'
        })
    }
    const logOut = async () => {
        const token = localStorage.getItem('jwt');
        try {
            const result = await axios.post('http://localhost:4000/logout',
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}` // ✅ attach token here
                    }
                }
            );
            if ([205, 204].includes(result.status)) {
                localStorage.removeItem('jwt');
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    generateError(error.response.statusText);
                    localStorage.removeItem('jwt');
                    navigate('/register')
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