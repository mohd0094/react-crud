import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import regiterHeaderImg from './website.png'
import Swal from 'sweetalert2'
const Login = () => {
    const [email, setREmail] = useState('');
    const [emailErr, setREmailErr] = useState('');

    const [password, passwordupdate] = useState('');
    const [passwordErr, passwordupdateErr] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const prossedLogin = (e) => {
        e.preventDefault();
        if (validate()) {

            let registerData = JSON.parse(localStorage.getItem('newUser'));

            if (!registerData) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: `If you are a new user. Please register after login`
                  })
            }else {
                if (registerData.email === email && registerData.password === password) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    iconColor: 'white',
                    customClass: {
                        popup: 'colored-toast'
                    },
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
                Toast.fire(registerData.name  +' you have Successfully Logged In!', '', 'success')
                sessionStorage.setItem('LoggedInUser', registerData.name);
                navigate('/');
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    iconColor: 'white',
                    customClass: {
                        popup: 'colored-toast'
                    },
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                })
                Toast.fire('Email and Password do not match.', '', 'error')
            }
        }

        }
    }


    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    const userEmail = (e) => {
        if (!isValidEmail(e.target.value)) {
            setREmailErr('Please enter valide email');
        } else {
            setREmailErr(null)
        }
        setREmail(e.target.value);
    }

    const userPassFun = (e) => {
        if (!(e.target.value)) {
            passwordupdateErr('Field is required');
        } else (
            passwordupdateErr(null)
        )
        passwordupdate(e.target.value);
    }

    const validate = () => {
        let result = true;
        if (!email) {
            setREmailErr('Field is required');
            result = false;
        }

        if (!password) {
            result = false;
            passwordupdateErr('Field is required');
        }

        return result;
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center px-3">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-3xl font-semibold text-center text-gray-600 mt-3 mb-4">Sign in</h1>
                        <img src={regiterHeaderImg} alt="Logo" className="w-30 h-20" />
                    </div>
                    <form onSubmit={prossedLogin}>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm text-gray-600">Email <span className='text-red-500'>*</span></label>
                            <input type="email" value={email} onChange={userEmail} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required="" />
                            <span className='text-red-500 small d-flex h-1 '>{emailErr}</span>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm text-gray-600">Password <span className='text-red-500'>*</span></label>
                            <input type="password" value={password} onChange={userPassFun} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required="" />
                            <span className='text-red-500 small d-flex h-1 '>{passwordErr}</span>
                        </div>

                        <button type="submit" className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2">Continue</button>

                    </form>
                    <div className="text-center">
                        <p className="text-sm">Not a member? <Link to={'/register'} className="text-cyan-600">Register</Link></p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login
