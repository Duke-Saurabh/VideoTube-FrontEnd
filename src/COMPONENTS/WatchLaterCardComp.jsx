import React from 'react'
import './WatchLaterCardComp.css';

function WatchLaterCardComp({title,desc,creator}) {

//   const handleFetchChannelVedios= async () => {
//     try {
//         const response = await fetch(`/api/v1/users/videos?channelUserName=${title}`);

//         if (response.ok) {
//             const responseData = await response.json();
//             const { videos } = responseData;
//             setVideosFetched([...videos]);
//         } else {
//             const errorData = await response.json();
//             alert(`Failed to load videos: ${errorData.error}`);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred during videos loading. Please try again.');
//     }
// };


  return (
    <div className='WatchLaterCard' 
    // onClick={handleFetchChannelVedios}
    >
        <div className='thumbnail'></div>
        <div className='video-info'>
          <p className='video-title'>{title}</p>
          <p className='desc'>{desc}</p>
          <div className='about-video'>
            <p className='creator'>Creator: {creator}</p>
            <p className='removeWatchLater'> Remove </p>
          </div>
        </div>
    </div>
  )
}

export default WatchLaterCardComp