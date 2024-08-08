import React, { useContext, useEffect, useState } from 'react'
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../userContext/UserContext';

function Header() {

  const {user,setUser}=useContext(UserContext);
  const navigate=useNavigate();

  const [isToLogout,setIsToLogout]=useState();

  console.log('user1:',user)
  const isSignedIn = {
    display: user ? 'none' : undefined
  };

  console.log('isSignedIn:',isSignedIn)
  const isSignedInReverse = {
    display: user ? 'block':'none'
  };
  
  console.log('isSignedInReverse',isSignedInReverse)


  const handleSignIn=()=>{
    navigate('/Login');
  }

  const handleSignUp=()=>{
    navigate('/Register');
  }

  const handleSignOut=async () => {
  
      const dataObj = {
        email: user?.email || '',
        channelUserName: user?.channelUserName || '',
      };
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
      };
  
      try {
        const response = await fetch('/api/v1/users/logout', options);
        if (response.ok) {
          // Clear tokens from local storage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
  
          // Clear user context
          setUser(null);
          setIsToLogout(false);
          navigate(`/login`); // Redirect to login page
        } else {
          const errorData = await response.json();
          alert(`Logout failed: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during logout. Please try again.');
      }
    };
  
  return (
    <div className='Header'>
      {isToLogout && (
        <div className="logout-panel">
          <div className="logout-box">
            <p>Do you want to logout?</p>
            <div className="logout-options">
              <button type="button" onClick={handleSignOut}>Yes</button>
              <button type="button" onClick={() => setIsToLogout(false)}>No</button>
            </div>
          </div>
        </div>
      )}
      <div className='searchBox'>
        <input placeholder='search' className='search-video'></input>
        <button className='search-video-btn'>Seach</button>
      </div>
      <div className='header-container'>
          <button className='sign-in' style={isSignedIn} type='button' onClick={handleSignIn}>SIGN IN</button>
          <button className='sign-up' style={isSignedIn} type='button' onClick={handleSignUp}>SIGN UP</button>
          <button className='sign-out' style={isSignedInReverse}  type='button' onClick={()=>setIsToLogout(prev=>!prev)}>SIGN Out</button>

      </div>
    </div>
  )
}

export default Header
