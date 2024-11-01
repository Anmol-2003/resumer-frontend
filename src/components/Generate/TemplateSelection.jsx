import React from 'react'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom' 
import { useSelector } from 'react-redux'

const TemplateSelection = () => {
    const navigate = useNavigate();
    const userId = useSelector(state => state.user.userId); 
    
  return userId ? (
    <div className='h-screen'>
        <p className='text-[24px] py-5 text-center'>Choose a template of your choice</p>
        <div className='flex justify-evenly p-10 gap-10'>
            <div className='p-5 border-2 border-black rounded-2xl hover:shadow-xl cursor-pointer animate-slideUp' onClick={()=>{
                const template = 1; 
                navigate(`/dashboard/${template}`); 
            }}>
                <img src={assets.template1} className='w-[350px] border-2' alt="" />
                <p className='text-[20px] text-center font-bold'>Template 1</p>
            </div>
            <div className='p-5 border-2 border-black rounded-2xl hover:shadow-xl cursor-pointer animate-slideUp' onClick={()=>{
                const template = 2; 
                navigate(`/dashboard/${template}`); 
            }}>
                <img src={assets.template2} className='w-[350px] border-2' alt="" />
                <p className='text-[20px] text-center font-bold'>Template 2</p>
            </div> 
            <div className='p-5 border-2 border-black rounded-2xl hover:shadow-xl cursor-pointer animate-slideUp' onClick={()=>{
                const template = 3; 
                navigate(`/dashboard/${template}`); 
            }}>
                <img src={assets.template3} className='w-[350px] border-2' alt="" />
                <p className='text-[20px] text-center font-bold'>Template 3</p>
            </div>
        </div>
    </div>
  ) : (
    <div>
        <h1 className='font-bold text-[40px] text-center'>Login or create an account first mate</h1>
    </div>
  )
}

export default TemplateSelection