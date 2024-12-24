import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import assets from '../../assets/assets';
import EditCard from './EditDetailsCard';
import AddDetailsCard from './AddDetailsCard';
import Loader from '../Loader';

// Design needs to be updated. 
// Hitting the server alot of times. Need to implement cache and better logic


const UserDetails = () => {
    const publicIp = import.meta.env.VITE_SERVER_IP;
    const [content, setContent] = useState('');
    const [details, setDetails] = useState({}); 
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector(state => state.user.userId);
    // editModal
    const [isEditModalOpen, setisEditModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    // addModal
    const [isAddModalOpen, setisAddModalOpen] = useState(false);
    // Functionality when the user clicks the card
    const handleEditClick = (content, item) => {
        setModalContent({content : content, item : item});
        setisEditModalOpen(true);
    }

    const handleAddDetails = () =>{
        setisAddModalOpen(true);
    }

    const fetchUserDetails = async () => {
        // userId is used here to pass it into the parameter of the url for fettching data.
        try {
            console.log(`User ID - ${userId}`);
            const response = await fetch(`${publicIp}/fetchUserDetails/${userId}`, {
                method : ['GET'], 
            }); 
    
            if(response.status === 200){
                const responseBody = await response.json(); 
                if(responseBody.data === undefined){
                    console.log('Data returned is empty.')
                    // setDetails({});
                } else {
                    setDetails(responseBody.data);
                }
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.log(`${error}`); 
        } finally {
            setIsLoading(false);
            console.log(details);
        }
    };
    
    // fetching user data once the page is loaded
    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <div className='w-screen h-screen flex overflow-hidden p-5 justify-center'>
            {isLoading ? (
                <Loader />
            ) : (
            <div className='w-5/6 border-[2px] rounded-xl flex text-[20px]' >

            
            
            {/* navigation div */}
                <div className='flex flex-col pl-5 pt-20 gap-10 border-r-[1px] pr-5'>
                    <div className={content === 'profile' ? 'font-bold ' : 'text-gray cursor-pointer'} onClick={async () => {
                        setContent('profile');
                    }}>Profile</div>
                    <div className={content === 'experience' ? 'font-bold' : 'text-gray cursor-pointer'} onClick={async () => {
                        setContent('experience');}} >Experience</div>
                    <div className={content === 'projects' ? 'font-bold' : 'text-gray cursor-pointer'} onClick={async () => {
                        setContent('projects');
                    }}>Projects</div>
                    <div className={content === 'education' ? 'font-bold' : 'text-gray cursor-pointer'} onClick={async () => {
                    
                        setContent('education');
                    }}>Education</div>
                    <div className={content === 'skills' ? 'font-bold' : 'text-gray cursor-pointer'} onClick={async () => {
                        
                        setContent('skills');
                    }}>Skills</div>
                </div>
            {/* Content Section */}
            <div className='flex-grow p-5 h-full overflow-y-scroll'>
                            <>
                                {content === 'profile' ? (
                                    <div className='p-5'>
                                        <h1 className='font-bold mb-10 text-[28px] border-b-[2px]'>Profile Details</h1>
                                        <div className='mb-5'>
                                        <p className='text-[18px] font-bold'>
                                            Name: 
                                        </p>
                                        <p>{details.Profile[0].firstName + " " +details.Profile[0].lastName}</p>
                                        </div>
                                        <div className='mb-5'>
                                        <p className='text-[18px] font-bold'>
                                            Email: 
                                        </p>
                                        <p className=''>{details.Profile[0].email}</p>
                                        </div>
                                        
                                        <div className='mb-5'>
                                            <p className='text-[18px] font-bold '>
                                                LinkedIn:
                                            </p>
                                            <a href={details.Profile[0].linkedinLink} className=''>{ details.Profile[0].linkedinLink}</a>
                                        </div>
                                        <div className='mb-5'>
                                            <p className='text-[18px] font-bold '>
                                                Github:
                                            </p>
                                            <a href={details.Profile[0].githubLink} className=''>{ details.Profile[0].githubLink}</a>
                                        </div>
                                    </div>
                                ) : content === 'experience' ? (
                                    <>
                                        <div className='flex justify-between border-b-[2px] pb-5'>
                                            <h1 className='font-bold text-[28px]'>Experience</h1>
                                            <button 
                                            onClick={handleAddDetails}
                                            className='border-[1px] px-12 rounded-3xl text-[#5f27c7] border-[#5f27c7] cursor-pointer hover:bg-gray-100 font-bold'>
                                            + Experience
                                            </button>
                                        </div>
                                        <div className='px-5 py-10 flex flex-col gap-5 max-h-full'>
                                            {details.Experience && details.Experience.length > 0 ? (
                                            details.Experience.map((item, index) => (
                                                <div key={index} className='border-[1px] border-gray rounded-2xl p-5 overflow-hidden cursor-pointer hover:bg-gray-100' style={{ maxWidth: '650px' }} onClick={()=>handleEditClick('experience', item)}>
                                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                                <p className='text-gray-500'>{item.duration}</p>
                                                <p className='text-gray-700'>{item.employer}</p>
                                                <p className='text-ellipsis overflow-hidden whitespace-nowrap'>{item.description}</p>
                                                </div>
                                            ))
                                            ) : (
                                            <p className='text-[20px] text-center'>No data available.</p>
                                            )}
                                        </div>
                                    </>
                                ) : content === 'projects' ? (
                                    <>
                                        <div className='flex justify-between border-b-[2px] pb-5'>
                                            <h1 className='font-bold text-[28px]'>Projects</h1>
                                            <button 
                                            onClick={handleAddDetails}
                                            className='border-[1px] px-12 rounded-3xl text-[#5f27c7] border-[#5f27c7] cursor-pointer hover:bg-gray-100 font-bold'>
                                            + Projects 
                                            </button>
                                        </div>
                                        <div className='px-5 py-10 flex flex-col gap-5 max-h-full'>
                                            {details.Projects && details.Projects.length > 0 ? (
                                            details.Projects.map((item, index) => (
                                                <div key={index} className='border-[2px] rounded-2xl p-5 overflow-hidden hover:bg-gray-100 cursor-pointer' style={{ maxWidth: '650px' }} onClick={() => handleEditClick('projects', item)}>
                                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                                    <p className='text-gray-500 text-[14px]'>{item.techStack}</p>
                                                    <p className='text-ellipsis overflow-hidden whitespace-nowrap'>{item.description}</p>
                                                </div>
                                            ))
                                            ) : (
                                            <p className='text-[20px] text-center'>No data available.</p>
                                            )}
                                        </div>
                                    </>
                                ) : content === 'education' ? (
                                    <>
                                        <div className='flex justify-between border-b-[2px] pb-5'>
                                            <h1 className='font-bold text-[28px]'>Education</h1>
                                            <button 
                                            onClick={handleAddDetails}
                                            className='border-[1px] px-12 rounded-3xl text-[#5f27c7] border-[#5f27c7] cursor-pointer hover:bg-gray-100 font-bold'>
                                            + Education 
                                            </button>
                                        </div>
                                        <div className='px-5 py-10 flex flex-col gap-5 max-h-full'>
                                            {details.Education && details.Education.length > 0 ? (
                                            details.Education.map((item, index) => (
                                                <div key={index} className='border-[2px] rounded-2xl p-5 overflow-hidden hover:bg-gray-100 cursor-pointer' style={{ maxWidth: '650px' }} onClick={() => handleEditClick('education', item)}>
                                                    <h2 className='font-bold text-lg'>{item.institution}</h2>
                                                    <div className='flex justify-between'>
                                                        <p className='text-gray-500'>{item.duration}</p>
                                                        <p>{item.grade}</p>
                                                    </div>
                                                    <p>{item.location}</p>
                                                </div>
                                            ))
                                            ) : (
                                            <p className='text-[20px] text-center'>No data available.</p>
                                            )}
                                        </div>
                                    </>
                                ) : content === 'skills' ? (
                                    <>
                                    <div className='flex justify-between border-b-[2px] pb-5'>
                                        <h1 className='font-bold text-[28px] px-5'>Skills</h1>
                                        {/* <button className='justify-center border-[1px] px-12 rounded-3xl text-[#5f27c7] border-[#5f27c7] cursor-pointer hover:bg-gray-100 font-bold'>
                                            + Skills
                                        </button> */}
                                    </div>
                                    <div className='px-5 py-10 flex flex-col gap-5 max-h-full'>
                                    {details.Skills && details.Skills.length > 0 ? (
                                            details.Skills.map((item, index) => (
                                                <div>
                                                    <div className='flex gap-5'>
                                                    <h2 className="font-semibold text-[20px]">Languages</h2>
                                                    <img src={assets.edit} alt="" className='w-[15px] cursor-pointer' onClick={()=>{handleEditClick('skills', item)}}/>
                                                    </div>
                                                    {/* Can also use item instead of details.Skills[0].languages andn stuff */}
                                                    <p className="text-[16px]">{details.Skills[0].languages}</p> 
                                                    
                                                    <div className='flex gap-5'>
                                                    <h2 className="font-semibold text-[20px]">Frameworks</h2>
                                                    <img src={assets.edit} alt="" className='w-[15px] cursor-pointer' onClick={()=>{handleEditClick('skills', item)}}/>
                                                    </div>
                                                    <p className="text-[16px]">{details.Skills[0].frameworks}</p>
                                                    
                                                    <div className='flex gap-5'>
                                                    <h2 className="font-semibold text-[20px]">Coursers</h2>
                                                    <img src={assets.edit} alt="" className='w-[15px] cursor-pointer' onClick={()=>{handleEditClick('skills', item)}}/>
                                                    </div>
                                                    <p className="text-[16px]">{details.Skills[0].courses}</p>
                                                    
                                                    <div className='flex gap-5'>
                                                    <h2 className="font-semibold text-[20px]">Certifications</h2>
                                                    <img src={assets.edit} alt="" className='w-[15px] cursor-pointer' onClick={()=>{handleEditClick('skills', item)}}/>
                                                    </div>
                                                    <p className="text-[16px]">{details.Skills[0].certifications}</p>
                                                </div>
                                            ))
                                            ) : (
                                            <div>
                                                <button 
                                                onClick={handleAddDetails}
                                                className='border-[1px] px-12 rounded-3xl text-[#5f27c7] border-[#5f27c7] cursor-pointer hover:bg-gray-100 font-bold'>
                                                Add Skills
                                                </button>
                                            </div>
                                            )}
                                    </div>
                                    </>
                                    
                                ) : (
                                    <div className='flex flex-col p-10'>
                                        <img src={assets.resumer} alt="image" className='w-[350px] h-[350px] rounded-full object-cover mb-10 self-center' />
                                        <p className='text-center text-[28px]'>User Details</p>
                                    </div>
                                )}
                            </>
                    </div>
            </div>
            )}

            {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <EditCard content={modalContent.content} item={modalContent.item} onClose = {(changed)=>{
                    setisEditModalOpen(false);
                    if(changed){
                        fetchUserDetails();
                    }
                }}/>
            </div>
            )}

            {isAddModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <AddDetailsCard content={content} onClose={(added)=>{
                    setisAddModalOpen(false); 
                    if(added){
                        fetchUserDetails();
                    }
                }}/>
            </div>
            )}
        </div>
        )
}


export default UserDetails