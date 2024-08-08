import React from 'react'
import './ChannelCardComp.css';

function ChannelCardComp({title,videosCount,desc,creator,setVideosFetched}) {

  const handleFetchChannelVedios= async () => {
    try {
        const response = await fetch(`/api/v1/users/videos?channelUserName=${title}`);

        if (response.ok) {
            const responseData = await response.json();
            const { videos } = responseData;
            setVideosFetched([...videos]);
        } else {
            const errorData = await response.json();
            alert(`Failed to load videos: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during videos loading. Please try again.');
    }
};


  return (
    <div className='ChannelCard' onClick={handleFetchChannelVedios}>
        <div className='channel-image'></div>
        <div className='channel-info'>
          <p className='channel-title'>{title}</p>
          <p className='desc'>{desc}</p>
          <div className='about-channel'>
            <p className='creator'>Creator: {creator}</p>
            <p className='videosCount'> {videosCount} videos</p>
          </div>
        </div>
    </div>
  )
}

export default ChannelCardComp