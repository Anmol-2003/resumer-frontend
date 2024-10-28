import React, { useEffect, useState } from 'react'
import { UNSAFE_FetchersContext, useParams } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const { template } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [job_description, setJobDescription] = useState("");
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const userId = useSelector(state => state.userId);

  // USING AXIOS 
  const generateResume = async () => {
    if (!job_description) {
        alert('Please enter a job description');
        return;
    }
    setIsLoading(true);
    
    const data = {
        "user_id": userId,
        "job_description": job_description
    };

    try {
        // Axios request with responseType set to 'blob' to handle the binary file
        const response = await axios.post('http://127.0.0.1:3000/generateResume', data, {
            responseType: 'blob',  // Important: Set responseType to blob
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob); // This returns a string URL of the object/blob passed as parameter. Lifetime is same as of the window
            setPdfBlobUrl(url);
            
        } else {
            console.error('Error: Unable to generate resume.');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        setIsLoading(false);
    }
  };

  // whenever the dependency i.e; isLoading changes this function will be called.
  // useEffect(()=>{

  // }, [isLoading]);

  return (
    <div className='flex gap-5 p-10 m-0 bg-customGrey'>
      {/* Left side */}
      <div className='flex-column gap-5 h-screen w-1/2 bg-white rounded-xl'>
        <div><p className='text-center p-5 text-[24px] font-bold font-kanit'>Job Description</p></div>
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
          <button className='border-2 px-[100px] py-[8px] rounded-3xl bg-[#5f27c7] text-white font-bold hover:shadow-xl' onClick={generateResume}>
            Generate
          </button>
        </div>
      </div>

      {/* Right side */}
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
          </div>
        ) : (
          pdfBlobUrl ? (
            // Display the PDF in an iframe or object tag when available
            <iframe
              src={pdfBlobUrl}
              width="100%"
              height="100%"
              title="Generated Resume"
              className="rounded-xl"
            ></iframe>
          ) : (
            <p className='text-center p-10 text-[20px] font-bold'>No resume generated yet.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard