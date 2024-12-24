import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateNavPage } from '../../store-slices/navigation/nav-page';
import { useDispatch } from 'react-redux';
import Loader from '../Loader';


const ProfileDetails = () => {
    const publicIp = import.meta.env.VITE_SERVER_IP;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [profileDetails, setProfileDetails] = useState({
        firstName : "", 
        lastName : "", 
        email : "", 
        githubLink : "", 
        linkedinLink : "", 
    });
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state => state.user.userId); 
    const profileDetailsHandler = async () => {
        setIsLoading(true);
        const response = await fetch(`${publicIp}/saveUserProfile/${userId}`, {
            method : 'POST', 
            body : JSON.stringify(profileDetails), 
            headers : {'Content-Type' : 'application/json'}
        }); 
        if(response.ok){
            if(response.status == 200){
                dispatch(updateNavPage('home'));
                navigate('/');
            }else{
                console.log(`${response.status} response code error`);
            }
        }else{
            console.log('Bad response');
        }
        setIsLoading(false);
    }

    return (
        <div className="h-screen bg-[#5f27c7] flex items-center pl-[230px]">
          <div className="flex flex-col ml-[150px] w-[500px] h-[75vh] bg-gray-300 rounded-[20px] shadow-lg">
            { isLoading ? <Loader/> : (
              <>
            <div className="self-center mt-8 mb-16 text-[38px] font-bold text-[#5f27c7] font-pacifico">
              Profile Details
            </div>
            <div className="self-center space-y-8">
              <div className="flex gap-[20px]">
                <input
                  type="text"
                  placeholder="First Name"
                  value={profileDetails.firstName}
                  onChange={(e) => setProfileDetails(prev => ({...prev, firstName : e.target.value}))}
                  className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
                />
              </div>
              <div className="flex gap-[20px]">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={profileDetails.lastName}
                  onChange={(e) => setProfileDetails(prev => ({...prev, lastName : e.target.value}))}
                  className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
                />
              </div>
              <div className="flex gap-[20px]">
                <input
                  type="email"
                  placeholder="Email ID"
                  value={profileDetails.email}
                  onChange={(e) => setProfileDetails(prev => ({...prev, email : e.target.value}))}
                  className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
                />
              </div>
              <div className="flex gap-[20px]">
                <input
                  type="text"
                  placeholder="GitHub Link"
                  value={profileDetails.githubLink}
                  onChange={(e) => setProfileDetails(prev => ({...prev, githubLink : e.target.value}))}
                  className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
                />
              </div>
              <div className="flex gap-[20px]">
                <input
                  type="text"
                  placeholder="LinkedIn Link"
                  value={profileDetails.linkinLink}
                  onChange={(e) => setProfileDetails(prev => ({...prev, linkedinLink : e.target.value}))}
                  className="w-[300px] h-[35px] rounded-lg border-[0.3px] border-black px-[10px] text-[18px]"
                />
              </div>
            </div>
            <div className="flex flex-col items-center mt-10 space-y-5">
              <button
                className="h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg"
                onClick={profileDetailsHandler}
              >
                Continue
              </button>
            </div>
            </>
            )}
          </div>
        </div>
      );    
}

export default ProfileDetails