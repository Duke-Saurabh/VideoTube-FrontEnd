import React, { useContext, useRef, useState } from 'react';
import './VideoCardComp.css';
import { UserContext } from '../userContext/UserContext';

function VideoCardComp({ title, creator, createdAt, description, likes, thumbnail, content, views, id }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const { user, setUser } = useContext(UserContext);
    let commentsCount = 0;
    let subscribeCounts = 0;

    const closebtnref = useRef(null);

    const startVideo =async () => {
        setIsVideoPlaying(true);
        try {
            const response = await fetch(`/api/v1/users/video`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoId: id }),
            });
            
            if (response.ok) {
                const responseData = await response.json();
                const { userInDb } = responseData;
                console.log('user in start video',userInDb);
                if(userInDb)
                setUser(userInDb);
            
            } else {
                const errorData = await response.json();
                // alert(`Failed to Add video to Watch Later: ${errorData.error}`);
            }
            
        } catch (error) {
            
        }
    };

    const stopVideo = (event) => {
        event.stopPropagation();
        setIsVideoPlaying(false);
    };

    const handleSetWatchLater = async () => {
        if(!user) return;
        if(!id) {
            alert('Video Id is not given');
            return;
        }
        console.log('Watch Later clicked');
        try {
            const response = await fetch(`/api/v1/users/watchLater`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ videoId: id }),
            });
            
            if (response.ok) {
                const responseData = await response.json();
                const { userInDb } = responseData;
                console.log('user in watch later',userInDb);
                if(userInDb)
                setUser(userInDb);
            } else {
                const errorData = await response.json();
                // alert(`Failed to Add video to Watch Later: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            // alert('An error occurred during videos loading in watch later. Please try again.');
        }
    };
    

    return (
        <div className='videoCard'>
            <div className='video' onClick={startVideo} style={{ backgroundImage: `url(${thumbnail})` }}>
                {!isVideoPlaying ? (
                    <div className='play-icon'>▶</div>
                ) : (
                    <video className='videoPlayer' controls autoPlay>
                        <source src={content} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                {isVideoPlaying && (
                    <button ref={closebtnref} className='close-video-btn' onClick={stopVideo}>X</button>
                )}
            </div>

            <div className='video-info'>
                <div className='video-info-heading'>
                    <p className='video-title'>{title}</p>
                    <div className='about-video'>
                        <p className='creator'>Creator: {creator}</p>
                        <p className='viewsCount'>{views} views</p>
                    </div>
                </div>
                <p className='desc'>{description}</p>
                <div className='stats'>
                    <p className='likeCount'>Likes: {likes}</p>
                    <p className='commentsCount'>Comments: {commentsCount}</p>
                    <p className='subscribeCounts'>Subscribers: {subscribeCounts}</p>
                </div>
                <div className='buttons'>
                    <button className='likebtn' type='button'>Like</button>
                    <button className='commentbtn' type='button'>Comment</button>
                    <button className='subscribebtn' type='button'>Subscribe</button>
                    <button onClick={handleSetWatchLater} type='button' className='watchLaterBtn'>Watch Later</button>
                </div>
            </div>
        </div>
    );
}

export default VideoCardComp;
