import React, { useEffect, useState } from 'react'
import { UNSAFE_FetchersContext, useParams } from 'react-router-dom'

const Dashboard = () => {
  const { template } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [job_description, setJobDescription] = useState("");

  const generateResume = async () => {
    if (!job_description) {
      alert('Please enter a job description');
      return;
    }
    setIsLoading(true);
    const data = {
      "userId": 1,
      "template": template,
      "job_description": job_description
    };
    try {
      const response = await fetch('http://127.0.0.1:3000/generateResume', {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // response is a Promise - a future (dart) type of object so we have to await for it.
      if (response.status === 200) {
        const blob = await response.blob(); 
        const url = window.URL.createObjectURL(blob); 

        const a = document.createElement('a'); 
        a.hred = url; 
        a.download = 'resume.pdf'; 
        document.body.appendChild(a); 
        a.click(); 
        a.remove(); 
        window.URL.revokeObjectURL(url);
      } else {
        console.log(`Error occured`);
      }
    } catch (error) {
      alert('Error : ' + error.message);
    } finally {
      setIsLoading(false);
    }
  }
  // whenever the dependency i.e; isLoading changes this function will be called.
  // useEffect(()=>{

  // }, [isLoading]);

  return (
    <div className='flex gap-5 p-10 m-0 bg-customGrey'>
      {/* left side */}
      <div className='flex-column gap-5 h-screen w-1/2  bg-white rounded-xl'>
        <div className=''><p className='text-center p-5 text-[24px] font-bold font-kanit'>Job Description</p></div>
        <div className='flex-grow flex flex-col p-4'>
          <textarea
            value={job_description}
            className='h-[300px] w-full border-2 p-4 resize-none rounded-2xl'
            placeholder='Input Job description'
            style={{ boxSizing: 'border-box' }}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <div className='m-5 flex justify-center'>
          <button className='border-2 px-[100px] py-[8px] rounded-3xl bg-[#5f27c7] text-white font-bold hover:shadow-xl' onClick={generateResume}>Generate</button>
        </div>
      </div>
      {/* right side */}
      <div className='flex-column gap-5 h-screen w-1/2 bg-white rounded-xl'>
        {isLoading ? (
          <div className='flex justify-center items-center h-full'>
            {/* Loading spinner or Tenor GIF */}
            <div className='flex-column h-full'>
              {/* Directly embed the Tenor GIF */}
              <iframe
                src="https://tenor.com/embed/20423219"
                width="100%"
                height="70%"
                frameBorder="0"
                allowFullScreen
                title="Loading..."
              ></iframe>
              <p className='p-5 font-bold text-[18px]'>The AI is generating your resume, please be patient.</p>
            </div>
            <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
          </div>
        ) : (
          <p className='text-center p-10 text-[20px] font-bold'>No resume generated yet.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard