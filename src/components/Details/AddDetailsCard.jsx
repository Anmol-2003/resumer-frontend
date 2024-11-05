import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const AddDetailsCard = ({content, onClose}) => {
    const userId = useSelector(state => state.user.userId);

    const initialFormData = () => {
        if (content === 'experience') {
            return { userId : userId, title: "", employer: "", duration: "", description: "" };
        } else if (content === 'projects') {
            return { userId : userId , title: "", description: "", techStack: "" };
        } else if (content === 'education') {
            return { userId : userId, institution: "", location: "", duration: "", grade: "" };
        } else if(content ==='skills'){
            return {userId : userId , languages : "", frameworks : "", courses : "", certifications : ""};
        } else return {};
    };

    const [formData, setFormData] = useState(initialFormData());

    useEffect(() => {
        setFormData(initialFormData());
    }, [content]); // Only depends on the content type to be inserted to the database.

    const handleSave = async () => {
        let isFormIncomplete = false; 
        if(content != 'skills'){
            isFormIncomplete = Object.values(formData).some(value => 
                typeof value === "string" ? value.trim() === "" : value === ""
            );
        }
        if(isFormIncomplete && content != 'skills'){
            console.log('Please fill all the details'); 
            return; 
        }
        const url = "http://34.46.197.121:3000" + 
            (content === 'experience' ? "/saveExperience" : 
            content === 'projects' ? "/saveProject" : 
            content === 'skills' ? '/saveSkills': '/saveEducation');

        const response = await fetch(url, {
            headers : {'Content-Type' : 'application/json'}, 
            body : JSON.stringify(formData),
            method : 'POST'
        });
        if(response.ok){
            const responseBody = await response.json(); 
            if(responseBody.status_code === 200){
                alert('Data saved'); 
                onClose(true);
            } else {
                console.log(`${responseBody.status_code} Error occured`);
                onClose(false);
            }
        }else {
            console.log('Bad response');
            onClose(false);
        }
    };

  return (
    <div className='addModal bg-white w-1/2 h-5/6 rounded-2xl p-5 flex flex-col'>
        {/* Adding details part */}
        <div className='overflow-y-auto flex-grow border-b-[2px]' >
            {content === 'experience' && (
                <>
                <div className='mb-5'>
                    <label htmlFor="">Title : 
                        <input 
                        type='text' 
                        value={formData.title}
                        onChange={e => setFormData(prev => ({...prev, title : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                </div>
                <div className='mb-5'>
                <label htmlFor="">Employer : 
                    <input 
                    type='text' 
                    value={formData.employer}
                    onChange={(e) => {
                        setFormData(prev => ({...prev, employer : e.target.value}))
                    }}
                    className='w-full border rounded px-2 py-1'>
                    </input>
                </label>
                </div>
                <div className='mb-5'>
                <label htmlFor="">Duration : 
                    <input 
                    type='text' 
                    value={formData.duration}
                    onChange={e => setFormData(prev => ({...prev, duration : e.target.value}))}
                    className='w-full border rounded px-2 py-1'>
                    </input>
                </label>
                </div>
                <div className='mb-5'>
                <label htmlFor="">Description : 
                    <input 
                    type='text' 
                    value={formData.description}
                    onChange={e => setFormData(prev => ({...prev, description : e.target.value}))}
                    className='w-full border rounded px-2 py-1'>
                    </input>
                </label>
                </div>
                </>
            )}
            {content === 'projects' && (
                <>
                <div className='mb-5'>
                    <label htmlFor="">Title : 
                        <input 
                        type='text' 
                        value={formData.title}
                        onChange={e => setFormData(prev => ({...prev, title : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                </div>
                <div className='mb-5'>
                <label htmlFor="">Desciption : 
                    <input 
                    type='text' 
                    value={formData.description}
                    onChange={e => setFormData(prev => ({...prev, description : e.target.value}))}
                    className='w-full border rounded px-2 py-1'>
                    </input>
                </label>
                </div>
                <div className='mb-5'>
                <label htmlFor="">Tech Stack : 
                    <input 
                    type='text' 
                    value={formData.techStack}
                    onChange={e => setFormData(prev => ({...prev, techStack : e.target.value}))}
                    className='w-full border rounded px-2 py-1'>
                    </input>
                </label>
                </div>
                </>
            )}
            {content === 'education' && (
                <>
                <div className='mb-5'>
                    <label htmlFor="">Institution : 
                        <input 
                        type='text' 
                        value={formData.institution}
                        onChange={e => setFormData(prev => ({...prev, institution : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                </div>
                <div className='mb-5'>
                <label htmlFor="">Duration : 
                    <input 
                    type='text' 
                    value={formData.duration}
                    onChange={e => setFormData(prev => ({...prev, duration : e.target.value}))}
                    className='w-full border rounded px-2 py-1'>
                    </input>
                </label>
                </div>
                <div className='mb-5'>
                <label htmlFor="">Location : 
                    <input 
                    type='text' 
                    value={formData.location}
                    onChange={e => setFormData(prev => ({...prev, location : e.target.value}))}
                    className='w-full border rounded px-2 py-1'>
                    </input>
                </label>
                </div>
                <div className='mb-5'>
                <label htmlFor="">Grade : 
                    <input 
                    type='text' 
                    value={formData.grade}
                    onChange={e => setFormData(prev => ({...prev, grade : e.target.value}))}
                    className='w-full border rounded px-2 py-1'>
                    </input>
                </label>
                </div>
                </>
            )}
            {
                content === 'skills' && (
                    <>
                    <div className='mb-5'>
                    <label htmlFor="">Languages : 
                        <input 
                        type='text' 
                        value={formData.languages}
                        onChange={e => setFormData(prev => ({...prev, languages : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>
                    <div className='mb-5'>
                    <label htmlFor="">Frameworks : 
                        <input 
                        type='text' 
                        value={formData.frameworks}
                        onChange={e => setFormData(prev => ({...prev, frameworks : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>
                    <div className='mb-5'>
                    <label htmlFor="">Courses : 
                        <input 
                        type='text' 
                        value={formData.courses}
                        onChange={e => setFormData(prev => ({...prev, courses : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>
                    <div className='mb-5'>
                    <label htmlFor="">Certifcations : 
                        <input 
                        type='text' 
                        value={formData.certifications}
                        onChange={e => setFormData(prev => ({...prev, certifications : e.target.value}))}
                        className='w-full border rounded px-2 py-1'>
                        </input>
                    </label>
                    </div>
                    </>
                )
            }
        </div>
        {/* Buttons for saving and cancel */}
        <div className='px-10 py-5 flex justify-between'>
            <button 
            onClick={handleSave}
            className='h-[40px] rounded-3xl bg-[#5f27c7] text-white font-bold px-10 w-[200px] cursor-pointer'>
                Save
            </button>
            <button 
            onClick={()=>{
                onClose(false); 
            }}
            className=' h-[40px] rounded-3xl border-[#5f27c7] border-[1px] px-10 text-[#5f27c7] cursor-pointer w-[200px]'>
                Cancel
            </button>

        </div>
    </div>
  )
}

export default AddDetailsCard