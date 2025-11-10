import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
            <div className=' bg-white'>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;