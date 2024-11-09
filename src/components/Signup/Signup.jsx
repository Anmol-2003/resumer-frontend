import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets/assets';
import { useDispatch } from 'react-redux';
import { updateUserId } from '../../store-slices/user-details/user-details';
import { updateNavPage } from '../../store-slices/navigation/nav-page';


const Signup = () => {
  
  const publicIp = import.meta.env.VITE_SERVER_IP;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupHandler = async () => {
    if (!username || !email || !password) {
      alert('Please enter your details properly');
      return;
    }
    const data = {
      'name':username,
      'email' : email,
      'password' : password
    };

    try {
      const response = await fetch(`${publicIp}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });
      let responseBody = await response.json();

      if (response.ok) {
        dispatch(updateUserId(responseBody.data)); // save the userId in the current session 
        localStorage.setItem('access_token', responseBody.token);

        navigate('/profile-details');
        // console.log(responseBody);
        // alert('Sign up successful');
      } else {
        console.log(responseBody);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="h-screen bg-[#5f27c7] flex items-center pl-[230px]">
      <div className="flex flex-col ml-[150px] w-[500px] h-[75vh] bg-gray-300 rounded-[20px] shadow-lg">
        <div className="self-center mt-8 mb-16 text-[38px] font-bold text-[#5f27c7] font-pacifico">
          Sign Up
        </div>
        <div className="self-center space-y-10">
          <div className="flex gap-[20px]">
            <img src={assets.user} alt="" className="w-[30px]" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
            />
          </div>
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
              className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-10 space-y-5">
          <button
            className="h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg"
            onClick={signupHandler}
          >
            Continue
          </button>
          <button
            className="h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
