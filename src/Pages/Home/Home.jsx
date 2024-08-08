import React, { useContext, useEffect, useRef, useState } from 'react'
import './Home.css'
import ChannelCardComp from '../../COMPONENTS/ChannelCardComp';
import { UserContext } from '../../userContext/UserContext';
import { useNavigate } from 'react-router-dom';
import VideoCardComp from '../../COMPONENTS/VideoCardComp';
import UploadVideoComp from '../../COMPONENTS/UploadVideoComp';
import WatchLaterCardComp from '../../COMPONENTS/WatchLaterCardComp';

function Home() {
  let channelsCount=0; let historyCount=0; let watchLaterCount=0; let videosCount=0;

  const {user,setUser}=useContext(UserContext);
  const [isSidePaneOpen, setIsSidePaneOpen] = useState(false);
  const [videosFetched,setVideosFetched]=useState([]);
  const [channelsFetched,setChannelsFetched]=useState([]);
  const [watchLaterFetched,setWatchLaterFetched]=useState([]);
  const [watchHistories,setWatchHistories]=useState([]);
  // const [watchLater,setWatchLater]=useState([]);
  const sidePaneRef = useRef(null);
  const videUploadRef=useRef(null);

  console.log('watchLater',watchLaterFetched);
  console.log('videosFetched:',videosFetched)

  const handleClickOutside = (event) => {
    if (sidePaneRef.current && !sidePaneRef.current.contains(event.target)) {
        setIsSidePaneOpen(false);
    }
  };

  const handleFetchAllVedios=async ()=>{
    try {
      const response = await fetch('/api/v1/users/videos');
  
      if (response.ok) {
        const responseData = await response.json();
        const {videos}=responseData;
        setVideosFetched([...videos]);
      } else {
        const errorData = await response.json();
        // alert(`failed to load videos: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('An error occurred during vedios loading. Please try again.');
    }
  }
  
  const handleFetchAllChannels=async()=>{
    try {
      const response = await fetch('/api/v1/users/channels');
      
      if (response.ok) {
        const responseData = await response.json();
        const {channels}=responseData;
        setChannelsFetched([...channels]);
      } else {
        const errorData = await response.json();
        // alert(`failed to load channels: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('An error occurred during channels loading. Please try again.');
    }
  }

  const handleFetchAllWatchLaters=async()=>{
    try {
      const response = await fetch(`/api/v1/users/watchLaters`);
 
      if (response.ok) {
        const responseData = await response.json();
        const {watchLaters}=responseData;
        setWatchLaterFetched([...watchLaters]);
      } else {
        const errorData = await response.json();
        // alert(`failed to load watch later videos: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('An error occurred during watch later videos loading. Please try again.');
    }
  }

  const handleFetchAllWatchHistory=async()=>{
    try {
      const response = await fetch('/api/v1/users/history');
  
      if (response.ok) {
        const responseData = await response.json();
        const {histories,userInDb}=responseData;
        setWatchHistories([...histories]);
        // setUser(userInDb);
      } else {
        const errorData = await response.json();
        // alert(`failed to load histories: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('An error occurred during histories loading. Please try again.');
    }
  }
  useEffect(() => {
    handleFetchAllVedios();
    handleFetchAllChannels();
    handleFetchAllWatchLaters();
    handleFetchAllWatchHistory();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [user]);
  
    const isSignedIn = {
      display: user ? 'none' : undefined
    };

    console.log('usercontext in home',user)
    console.log('isSignedIn in home',isSignedIn)
  
    const isSignedInReverse = {
      display: user ? 'block':'none'
    };
    console.log('isSignedInReverse in home',isSignedInReverse)
   
    const toggleSidePane = () => {
      setIsSidePaneOpen(!isSidePaneOpen);
    };

    const handleVideoUpload=()=>{
        if(user)
        videUploadRef.current.style.display='block';
    }

  return (
    <div className='homePage' id="home">
        <div className='hamburger-menu' onClick={toggleSidePane}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
        </div>
        <div className={`side-pane ${isSidePaneOpen ? 'open' : ''}`} ref={sidePaneRef}>
                <button className='close-btn' onClick={toggleSidePane}>X</button>
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#channels">Channels</a></li>
                        <li><a href="#videos">Videos</a></li>
                        <li><a className='UploadVideos' href="#UploadVideos" onClick={handleVideoUpload}>Upload Videos</a></li>
                        <li><a href="#watchHistory">Watch History</a></li>
                        <li><a href="#watchLater">Watch Later</a></li>
                    </ul>
            </nav>
        </div>

        



        <div className='vedio-upload'  
        id="UploadVideos"
         ref={videUploadRef}
        >
            <UploadVideoComp videUploadRef={videUploadRef} />
        </div>
        
        <div className='welcomeNotes'>
            <p className='user' style={isSignedInReverse}>Hii !! {user?.fullName} </p>
            <h1>Welcome to VideoTube</h1>
        </div>
        <div className='channels-container' id="channels">
            <div className='main-work-area'>
               <div className='channels-heading'>
                 <h2>Channels {channelsFetched?.length || 0}</h2>
                 <div className='search-channel-box'>
                 <input placeholder='Search Channels' className='search-channel'></input>
                 <button className='search-channel-btn'>Seach</button>     
                 <button type='button' className='viewAllChannelsBtn'>View All</button>
                 </div>
               </div>
               <div className='channels'>
                  {channelsFetched.map((channel, index) => (
                    <ChannelCardComp setVideosFetched={setVideosFetched} key={index} img={1} title={channel?.channelUserName} videosCount={channel?.videosLength} desc={channel?.description} creator={channel?.creator}></ChannelCardComp>
                  ))}
                  
               </div>
               <button className='load-more-channels-btn'>Load More</button>
            </div>
        </div>
            <div className='watchHistory-container' id="watchHistory" style={isSignedInReverse}>
            <div className='main-work-area'>
               <div className='watchHistory-heading'>
                  <h2>Watch Histories {historyCount}</h2>
                  <button type='button' className='viewAllHistoriesBtn'>View All</button>
               </div>
               <div className='watchHistories'>
                 
                  {
                    watchHistories?.map((history,index)=>(  
                      <VideoCardComp key={index} 
                        content={history?.video?.content}
                        createdAt={history?.video?.createdAt}
                        creator={history?.video?.channelUserName}
                        description={history?.video?.description}
                        thumbnail={history?.video?.thumbnail}
                        videoTitle={history?.video?.videoTitle}
                        views={history?.video?.views}
                        likes={history?.video?.likes}
                  id={history?.video?._id}

                  />
                    ))
                  }
               </div>
               <button className='load-more-channels-btn'>Load More</button>
            </div>
            </div>
            <div className='watchLater-containers' id="watchLater" style={isSignedInReverse}>
              <div className='main-work-area'>
               <div className='watchLater-heading'>
                  <h2>Watch Laters {watchLaterCount}</h2>
                  <button type='button' className='viewAllWatchLaterBtn'>View All</button>
                </div>
                <div className='watchLaters'>
                 
                  {
                    watchLaterFetched?.map((watchLater,index)=>(
                      <WatchLaterCardComp title={watchLater?.video?.videoTitle} desc={watchLater?.video?.description} creator={watchLater?.video?.description}></WatchLaterCardComp>
                    ))
                  }
                  
                </div>
                <button className='load-more-watchLater-btn'>Load More</button>
              </div>
            </div>     

                <div className='main-work-area' id="videos">
                <div className='videos-heading'>
                  <h2>Videos {videosFetched?.length||0}</h2>
                  
                  <div className='search-videos-box'>
                    <input placeholder='Search videos' className='search-video'></input>
                  <button className='search-videos-btn'>Seach</button>               
                 </div>
                </div>
                <div className='videosContainer'>
                {videosFetched.map((video, index) => (
                  <VideoCardComp key={index} 
                  content={video?.content}
                  createdAt={video?.createdAt}
                  creator={video?.channelUserName}
                  description={video?.description}
                  thumbnail={video?.thumbnail}
                  videoTitle={video?.videoTitle}
                  views={video?.views}
                  likes={video?.likes}
                  // setWatchLater={setWatchLater}
                  id={video?._id}

                  />
                ))}
                </div>
                  
                <button onClick={handleFetchAllVedios} className='load-more-videos-btn'>Load All</button>
                </div>  
  
    </div>
  )
}

export default Home