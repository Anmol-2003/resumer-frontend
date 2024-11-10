import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const EditCard = ({content, item, onClose}) => {
    const publicIp = import.meta.env.VITE_SERVER_IP;
    const [formData, setFormData] = useState({...item}); // shallow copy of the item
    const [isChanged, setIsChanged] = useState(false); // initially its not changed
    const userId = useSelector(state => state.userId);

    // APIs for saving or deleting the information
    const handleSave = async (itemId) => {
        try {  
            const response = await fetch(`${publicIp}/updateDetails/${content}/${itemId}`, {
                headers : {'Content-Type' : 'application/json'}, 
                method : 'POST', 
                body : JSON.stringify({...formData, userId : userId})
            });
            if(response.ok){
                const responseBody = await response.json();
                if(responseBody.status_code === 200) {
                    alert('details updated'); 
                    onClose(true); 
                }
                else {
                    console.log(`${responseBody.status_code} - error occured`);
                    onClose(false);
                }
            } else {
                alert('Some error occured');
                onClose(false); 
            }
        } catch (error) {
            console.log(error);
            onClose(false);
        }    
    }

    const handleDelete = async (id) =>{
        const response = await fetch(`${publicIp}/deleteDetails/${content}/${id}`, {
            method : 'DELETE', 
            headers: {'Content-Type' : 'application/json'}
        }); 
        if(response.ok){
            const responseBody = await response.json();
            if(responseBody.status_code === 200){
                alert('Detail deleted'); 
                onClose(true); 
            }else{
                console.log(`${responseBody.status_code} - Error occured`);
                onClose(false); 
            }
            
        }else {
            console.log('Error occured in deleting the data');
            onClose(false); 
        }
    }

    useEffect(()=>{
        if (content === 'experience'){
            const changed = 
            formData.title != item.title ||
            formData.duration != item.duration||
            formData.description != item.description ||
            formData.employer != item.employer;
            setIsChanged(changed);
        }else if(content === 'projects'){
            const changed = 
            formData.title != item.title ||
            formData.duration != item.duration||
            formData.description != item.description ||
            formData.techStack != item.techStack;
            
            setIsChanged(changed);
        }else if(content === 'education'){
            const changed = 
            formData.institution != item.institution ||
            formData.duration != item.duration||
            formData.grade != item.grade ||
            formData.location != item.location;
            
            setIsChanged(changed);
        }else if(content === 'skills') {
            const changed = 
            formData.languages != item.languages ||
            formData.frameworks != item.frameworks||
            formData.courses != item.courses ||
            formData.certifications != item.certifications;        
            setIsChanged(changed);
        } else {
            return "Error";   
        }
    }, [formData])
   return (
    <>
    <div className='editModal bg-white w-1/2 h-5/6 rounded-2xl p-5 flex flex-col'>
        {/* Information that can be edited */}
        <div className='overflow-y-auto flex-grow'>
        {content === 'experience' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit experience</h2>
                <div className='mb-5'>
                    <label htmlFor="">Title : 
                        <input 
                            type="text" 
                            value={formData.title} 
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Employer : 
                        <input 
                            type="text" 
                            value={formData.employer} 
                            onChange={(e) => setFormData({ ...formData, employer: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Duration : 
                        <input 
                            type="text" 
                            value={formData.duration} 
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Description : 
                        <textarea 
                            value={formData.description} 
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                            className='w-full border rounded px-2 py-1 h-[120px]'
                        />
                    </label>
                </div>
            </div>
            </>
        )}

        {content === 'projects' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit projects</h2>
                <div className='mb-5'>
                    <label htmlFor="">Title : 
                        <input 
                            type="text" 
                            value={formData.title} 
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Duration : 
                        <input 
                            type="text" 
                            value={formData.duration} 
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Tech Stack : 
                        <input 
                            type="text" 
                            value={formData.techStack} 
                            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Description : 
                        <textarea 
                            value={formData.description} 
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                            className='w-full border rounded px-2 py-1 h-[120px]'
                        />
                    </label>
                </div>
            </div>
            </>
        )}

        {content === 'education' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit education</h2>
                <div className='mb-5'>
                    <label htmlFor="">Institution : 
                        <input 
                            type="text" 
                            value={formData.institution} 
                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Duration : 
                        <input 
                            type="text" 
                            value={formData.duration} 
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Grade: 
                        <input 
                            type="text" 
                            value={formData.grade} 
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Location : 
                        <textarea 
                            value={formData.location} 
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
                            className='w-full border rounded px-2 py-1 h-[120px]'
                        />
                    </label>
                </div>
            </div>
            </>
        )}

        {content === 'profile' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit profile</h2>
                <div className='mb-5'>
                    <label htmlFor="">Email : 
                        <input 
                            type="text" 
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Github Link : 
                        <input 
                            type="text" 
                            value={formData.githubLink} 
                            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Linkedin Link: 
                        <input 
                            type="text" 
                            value={formData.linkedinLink} 
                            onChange={(e) => setFormData({ ...formData, linkedinLink: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
            </div>
            </>
        )}
        {content === 'skills' && (
            <>
            <div className='border-b-[2px]'>
                <h2 className='font-bold text-xl mb-5'> Edit profile</h2>
                <div className='mb-5'>
                    <label htmlFor="">Languages : 
                        <input 
                            type="text" 
                            value={formData.languages} 
                            onChange={(e) => setFormData({ ...formData, languages: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Frameworks : 
                        <input 
                            type="text" 
                            value={formData.frameworks} 
                            onChange={(e) => setFormData({ ...formData, frameworks: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Courses : 
                        <input 
                            type="text" 
                            value={formData.courses} 
                            onChange={(e) => setFormData({ ...formData, courses: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>
                <div className='mb-5'>
                    <label htmlFor="">Certifications : 
                        <input 
                            type="text" 
                            value={formData.certifications} 
                            onChange={(e) => setFormData({ ...formData, certifications: e.target.value })} 
                            className='w-full border rounded px-2 py-1'
                        />
                    </label>
                </div>

            </div>
            </>
        )}

        </div>
        <div className='flex justify-between px-10'>
            <button className='rounded-3xl bg-[#5f27c7] text-white font-bold px-10' disabled={!isChanged} onClick={async ()=> {
                const itemId = content === 'experience' ? item.expId : content === 'projects' ? item.projectId : content === 'education' ? item.eduId : content === 'profile' ? item.userId : item.skillsId;
                await handleSave(itemId);
            }}>Save</button>
            <button className='rounded-3xl border-[#5f27c7] border-[1px] px-10 text-[#5f27c7] cursor-pointer' onClick={()=>{onClose(false)}}>Cancel</button>
            <button className='rounded-3xl border-[#5f27c7] border-[1px] px-10 text-[#5f27c7] cursor-pointer' onClick={async () => {
                try {
                    const itemId = content === 'experience' ? item.expId : content === 'projects' ? item.projectId : content === 'education' ? item.eduId : content === 'profile' ? item.userId : null;
                    if (itemId) {
                        await handleDelete(itemId);
                    } else {
                        console.error('Invalid content type for deletion');
                    }
                } catch (error) {
                    console.error('Error deleting item:', error);
                }
            }}>Delete</button>
        </div>
    </div>
    </>
  )
}

export default EditCard