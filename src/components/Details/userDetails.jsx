import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import assets from '../../assets/assets';

// Design needs to be updated. 
// Hitting the server alot of times. Need to implement cache and better logic


const UserDetails = () => {
    const [content, setContent] = useState('');
    const [details, setDetails] = useState({}); 
    const [loading, setLoading] = useState(true);
    const userId = useSelector(state => state.userId);
    
    // Functionality when the user clicks the card
    const handleCardClick = (item) => {
        console.log('gay');
        return; 
    }

    const fetchUserDetails = async () => {
        // userId is used here to pass it into the parameter of the url for fettching data.
        try {
            console.log(`User ID - ${userId}`);
            const response = await fetch(`http://127.0.0.1:3000/fetchUserDetails/${userId}`, {
                method : ['GET'], 
            }); 
    
            if(response.ok){
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
            setLoading(false);
            console.log(details);
        }
    };
    
    // fetching user data once the page is loaded
    useEffect(() => {
        fetchUserDetails();
    }, []);

    // All the content fetched will be 
    if (loading) {
        return (
            // Add custom loading animation
            <div className='w-screen h-screen'>
                <p className='font-bold text-[28px] text-center'>Loading...</p>
            </div>
        )
    }else {
        return (
            <div className='flex justify-center p-5 h-screen'>
                <div className='w-5/6 border-[2px] rounded-xl flex' >
                {/* navigation div */}
                    <div className='flex flex-col pl-5 pt-20 gap-10 border-r-[1px] pr-5'>
                    <div className={content === 'profile' ? 'font-bold ' : 'text-gray cursor-pointer'} onClick={async () => {
                        setContent('profile');
                    }}>Profile</div>
                    <div className={content === 'experience' ? 'font-bold' : 'text-gray cursor-pointer'} onClick={async () => {
                        console.log(details);
                        setContent('experience');}} >Experience</div>
                    <div className={content === 'projects' ? 'font-bold' : 'text-gray cursor-pointer'} onClick={async () => {
                        setContent('projects');
                    }}>Projects</div>
                    <div className={content === 'education' ? 'font-bold' : 'text-gray cursor-pointer'} onClick={async () => {
                       
                        setContent('education');
                    }}>Education</div>
                    <div className={content === 'skills' ? 'font-bold' : 'text-gray cursor-pointer'} onClick={async () => {
                        
                        setContent('skills');
                    }}>Skills & Certifications</div>
                </div>
                <div className='flex-grow p-10'>
                                <>
                                    {content === 'profile' ? (
                                        <div>
                                            <h1 className='font-bold mb-10 text-[28px]'>Profile Details</h1>
                                            <p className='mb-5 text-[18px]'>
                                                Name: <span className='font-bold text-black'>{details.Profile[0].firstName}</span> <span className='font-bold'>{details.Profile.lastName}</span>
                                            </p>
                                            <p className='mb-5 text-[18px]'>
                                                Email: <span className='font-bold'>{details.Profile[0].email}</span>
                                            </p>
                                            <p className='mb-5 text-[18px]'>
                                                LinkedIn: <a href="" className='font-bold'>{details.Profile[0].linkedinLink}</a>
                                            </p>
                                            <p className='mb-5 text-[18px]'>
                                                GitHub: <a href="" className='font-bold'>{details.Profile[0].githubLink}</a>
                                            </p>
                                        </div>
                                    ) : content === 'experience' ? (
                                        <>
                                            <div className='flex justify-between border-b-[2px] pb-5'>
                                                <h1 className='font-bold text-[28px]'>Experience</h1>
                                                <button className='border-[1px] px-12 rounded-3xl text-[#5f27c7] border-[#5f27c7] cursor-pointer'>
                                                + Experience
                                                </button>
                                            </div>
                                            <div className='px-5 py-10 flex flex-col gap-5 overflow-y-auto'>
                                                {details.Experience && details.Experience.length > 0 ? (
                                                details.Experience.map((item, index) => (
                                                    <div key={index} className='border-[1px] border-gray rounded-2xl p-5 overflow-hidden cursor-pointer hover:bg-gray-100' style={{ maxWidth: '650px' }} onClick={()=>handleCardClick(item)}>
                                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                                    <p className='text-gray-500'>{item.duration}</p>
                                                    <p className='text-gray-700'>{item.employer}</p>
                                                    <p className='text-ellipsis overflow-hidden whitespace-nowrap'>{item.description}</p>
                                                    </div>
                                                ))
                                                ) : (
                                                <p className='text-[20px] text-center'>No experience data available.</p>
                                                )}
                                            </div>
                                        </>
                                    ) : content === 'projects' ? (
                                        <>
                                            <div className='flex justify-between border-b-[2px] pb-5'>
                                                <h1 className='font-bold text-[28px]'>Projects</h1>
                                                <button className='border-[1px] px-12 rounded-3xl text-[#5f27c7] border-[#5f27c7] cursor-pointer'>
                                                + Projects 
                                                </button>
                                            </div>
                                            <div className='px-5 py-10 flex flex-col gap-5 overflow-y-auto'>
                                                {details.Projects && details.Projects.length > 0 ? (
                                                details.Projects.map((item, index) => (
                                                    <div key={index} className='border-[2px] rounded-2xl p-5 overflow-hidden' style={{ maxWidth: '650px' }}>
                                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                                    <p className='text-gray-500 text-[14px]'>{item.techStack}</p>
                                                    <p className='text-ellipsis overflow-hidden whitespace-nowrap'>{item.description}</p>
                                                    </div>
                                                ))
                                                ) : (
                                                <p className='text-[20px] text-center'>No experience data available.</p>
                                                )}
                                            </div>
                                        </>
                                    ) : content === 'education' ? (
                                        <>
                                            <div className='flex justify-between border-b-[2px] pb-5'>
                                                <h1 className='font-bold text-[28px]'>Education</h1>
                                                <button className='border-[1px] px-12 rounded-3xl text-[#5f27c7] border-[#5f27c7] cursor-pointer'>
                                                + Education 
                                                </button>
                                            </div>
                                            <div className='px-5 py-10 flex flex-col gap-5 overflow-y-auto'>
                                                {details.Education && details.Education.length > 0 ? (
                                                details.Education.map((item, index) => (
                                                    <div key={index} className='border-[2px] rounded-2xl p-5 overflow-hidden' style={{ maxWidth: '650px' }}>
                                                    <h2 className='font-bold text-lg'>{item.institution}</h2>
                                                    <div className='flex justify-between'>
                                                        <p className='text-gray-500'>{item.duration}</p>
                                                        <p>{item.grade}</p>
                                                    </div>
                                                    <p>{item.location}</p>
                                                    </div>
                                                ))
                                                ) : (
                                                <p className='text-[20px] text-center'>No experience data available.</p>
                                                )}
                                            </div>
                                        </>
                                    ) : content === 'skills' ? (
                                        <div className='flex justify-between border-b-[2px] pb-5'>
                                            <h1 className='font-bold text-[28px]'>Skills</h1>
                                            <button className='border-[1px] px-12 rounded-3xl text-[#5f27c7] border-[#5f27c7] cursor-pointer'>
                                                + Skills
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='flex flex-col p-10'>
                                            <img src={assets.resumer} alt="image" className='w-[350px] h-[350px] rounded-full object-cover mb-10 self-center' />
                                            <p className='text-center text-[28px]'>User Details</p>
                                        </div>
                                    )}
                                </>
                        </div>
                </div>
            </div>
          )
    }
}

export default UserDetails