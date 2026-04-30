import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            navigate('/')
        }
    });

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const generateError = (err) => {
        toast.error(err, {
            position: 'bottom-right'
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/login', {
                ...values,
            }, { withCredentials: true });

            if (data.error) {
                generateError(data.error);
            } else {
                if (data.accessToken) {
                    localStorage.setItem('jwt', data.accessToken); // store in browser
                    navigate('/');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>
                <button type='submit'>Submit</button>
                <span>
                    Already have an account? <Link to='/register'>Register</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}