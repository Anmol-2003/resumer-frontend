import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateNavPage } from '../../store-slices/navigation/nav-page';

const NavBar = () => {
    const page = useSelector(state => state.navPage.page); 

    const dispatch = useDispatch(); 
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
                            dispatch(updateNavPage('home'));
                            navigate('/')
                        }}
                        className={page === "home" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                    >
                        Home
                    </li>
                    <li
                        onClick={() => {
                            dispatch(updateNavPage('details'));
                            navigate('/user-details');
                        }}
                        className={page === "details" ? "text-gray-400 cursor-pointer" : "cursor-pointer"}
                    >
                        Profile
                    </li>
                    <li
                        onClick={() => {
                            dispatch(updateNavPage('generate'));
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
