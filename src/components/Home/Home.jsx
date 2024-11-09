import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserId } from '../../store-slices/user-details/user-details'
import { updateNavPage } from '../../store-slices/navigation/nav-page'


const Home = () => {
  const publicIp = import.meta.env.VITE_SERVER_IP;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  // Authenticate access_token
  useEffect( ()=>{
    // Preventing a request to the server when session already has userId stored
    if(userId) return; 

    const access_token = localStorage.getItem('access_token');
    const fetchUserData = async () => {
      try{
        const response = await fetch(
          `${publicIp}/auth/me`, {
            method : ['GET'], 
            headers : {
              'Authorization' : `Bearer ${access_token}`, 
              'Content-Type' : 'application/json'
            }
          }
        ); 
        if(response.ok){
          const responseBody = await response.json(); // response is a promise type object
          if(responseBody.status_code === 500){
            // console.log('Token has expired.'); 
            navigate('/login')
          }
          // storing the userId data in the global state
          dispatch(updateUserId(responseBody.data));
          console.log('Token Authenticated')
        }else {
          console.log('Authentication Error');
          // navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);
  
  return (
    <div className=''>
      <div className='flex gap-10 m-20'>
        <div>
          <img className= 'h-[450px]' src={assets.homepage_img} alt="" />
        </div>
        <div>
        <h1 className='font-bold text-[34px] text-center ml-20'>The best resumer builder AI <br />out there.</h1>
        <p className='ml-10 mt-10 text-[18px]'><span className='text-[24px] font-bold'>63%</span> of recruiters like to get resumes personalized to the job position. </p>
        <p className='ml-10 mt-2 text-[18px]'><span className='text-[24px] font-bold'>83%</span> of recruiters say they're more likely to hire a candidate who has a well-formatted resume. </p>
        <p className='ml-10 mt-2 text-[18px]'><span className='text-[24px] font-bold'>60%</span> of hiring managers say they've found a typo on a resume. </p>
        <div className='flex justify-center mt-20'>  {/* Added flex and justify-center */}
          <button className='h-[40px] w-[300px] bg-[#5f27c7] text-white rounded-3xl hover:shadow-lg font-bold text-[18px]' onClick={()=>{
            if(!userId){
              navigate('/login');
            } 
            else{
              dispatch(updateNavPage('generate'));
              navigate('/template-selection');
            }
          }}>Get Started</button>
        </div>
        </div>   
      </div>
    </div>
  )

}

export default Home;
