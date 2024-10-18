import React from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../../assets/assets'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen flex items-center bg-white'>
      <div className='flex ml-36'>
        <div className='w-[400px] mt-2.5'>
          <div className='text-4xl font-bold mb-5'>Resumer.</div>
          <div className='text-xl mb-7'>
            <p>Your smart resume manager that tailors your professional story to match any job description, generating ATS-optimized resumes in sleek, customizable templates with ease.</p>
          </div>
          <div className=''>
            <ul className="flex flex-col space-y-5">
              <li>
                <button 
                  onClick={() => navigate('/login')}
                  className='w-[300px] h-10 bg-[#5f27c7] text-white font-bold text-lg rounded-full hover:shadow-lg'
                >
                  Login
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/signup')}
                  className='w-[300px] h-10 bg-[#5f27c7] text-white font-bold text-lg rounded-full hover:shadow-lg'
                >
                  Sign up
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className=''>
          <img src={assets.resumer_homepage} alt="" className='w-[550px]' />
        </div>
      </div>
    </div>
  )
}

export default Home;
