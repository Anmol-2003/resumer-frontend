import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [page, setPage] = useState("home");
    const navigate = useNavigate();
    return (
        <div className="px-[50px] py-[40px] flex justify-between items-center h-[30px] bg-[#5f27c7]">
            <div className="flex gap-y-5px items-center">
                <p className='text-white font-bold text-[24px]'>Resumer</p>
            </div>
            <div>
                <ul className="flex list-none gap-[50px] text-white text-[22px] font-kanit">
                    <li
                        onClick={() => {
                            setPage('home'); 
                            navigate('/')
                        }}
                        className={page === "home" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                    >
                        Home
                    </li>
                    <li
                        onClick={() => {
                            setPage('details');
                            navigate('/user-details');
                        }}
                        className={page === "details" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                    >
                        Details
                    </li>
                    <li
                        onClick={() => {
                          setPage('generate'); 
                          navigate('/template-selection');
                        }}
                        className={page === "generate" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                    >
                        Generate
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
