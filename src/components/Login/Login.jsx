import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets/assets';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const loginHandler = async () => {
        if (!email || !password) {
            alert('Please enter your details');
            return;
        }
        const data = { email, password };
        try {
            const response = await fetch('http://127.0.0.1:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                console.log('Successful login');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <div className="h-screen bg-[#5f27c7] flex items-center pl-[230px]">
            <div className="flex flex-col ml-[150px] w-[500px] h-[70vh] bg-gray-300 rounded-[20px] shadow-lg">
                <div className="self-center mt-8 mb-16 text-[38px] font-bold text-[#5f27c7] font-pacifico">
                    Login
                </div>
                <div className="self-center space-y-10">
                    <div className="flex gap-[20px]">
                        <img src={assets.email} alt="" className="w-[30px]" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
                        />
                    </div>
                    <div className="flex gap-[20px]">
                        <img src={assets.password} alt="" className="w-[30px]" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] py-[5px] text-[18px]"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center mt-10 space-y-5">
                    <button
                        className="h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg"
                        onClick={loginHandler}
                    >
                        Continue
                    </button>
                    <button
                        className="h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg"
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;