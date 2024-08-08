// src/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from './COMPONENTS/Index';
import './Layout.css';

function Layout() {
  return (
    <div>
      <Header />
      <div className='Main'>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
