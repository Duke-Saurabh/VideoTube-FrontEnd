import React, { useState, useRef, useEffect, useContext } from 'react';
import './UploadVideoComp.css';
import { UserContext } from '../userContext/UserContext';

function UploadVideo({ videUploadRef }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [playlist, setPlaylist] = useState('');
    const [playlistOptions, setPlaylistOptions] = useState([]);
    const [addPlaylist, setAddPlaylist] = useState('');
    const VideoFileInputRef = useRef(null);
    const ThumbnailFileInputRef = useRef(null);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        handleFetchPlaylists();
    }, [user]);

    const handleFetchPlaylists = () => {
        if (user?.playLists) {
            setPlaylistOptions([...user.playLists.reverse()]);
        }
    };

    const handleAddPlaylist = async () => {
        const dataObj = { playlistToAdd: addPlaylist };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataObj)
        };

        try {
            const response = await fetch('/api/v1/users/addPlaylist', options);
            if (response.ok) {
                const responseData = await response.json();
                const { user } = responseData;
                setUser(user);
                setAddPlaylist('');
                setPlaylistOptions([...user.playLists]);
            } else {
                const errorData = await response.json();
                alert(`Add playlist failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during adding playlist. Please try again.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('playlist', playlist);
        if (VideoFileInputRef.current.files[0]) {
            formData.append('video', VideoFileInputRef.current.files[0]);
        }
        if (ThumbnailFileInputRef.current.files[0]) {
            formData.append('thumbnail', ThumbnailFileInputRef.current.files[0]);
        }

        try {
            const response = await fetch('/api/v1/users/uploadVideo', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Upload successful:', responseData);
                handleCancel();
                const { user } = responseData;
                console.log('User changed in video upload', user);
                setUser(user);
                alert('Video Uploaded Successfully');
            } else {
                const errorData = await response.json();
                alert(`Upload failed: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during video upload. Please try again.');
        }
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setPlaylist('');
        if (VideoFileInputRef.current) {
            VideoFileInputRef.current.value = '';
        }
        if (ThumbnailFileInputRef.current) {
            ThumbnailFileInputRef.current.value = '';
        }
    };

    return (
        <div className="upload-video-container">
            <button className="close-btn" onClick={() => videUploadRef.current.style.display = 'none'}>×</button>
            <h2>Upload Video</h2>
            <form onSubmit={handleSubmit} className="upload-video-form">
                <div className="form-group">
                    <label htmlFor="title">Video Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter video title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter video description"
                        required
                    ></textarea>
                </div>
                <div className='add-playlist-container'>
                    <label htmlFor="add-playlist" className='add-playlist-label'>Add New Playlist</label>
                    <input
                        className='add-playlist'
                        id='add-playlist'
                        value={addPlaylist}
                        onChange={(e) => setAddPlaylist(e.target.value)}
                        placeholder='Enter New Playlist'
                    />
                    <button type='button' onClick={handleAddPlaylist} className='add-playlist-btn'>Add</button>
                </div>
                <div className="form-group">
                    <label htmlFor="playlist">Add to Playlist</label>
                    <select id="playlist" value={playlist} onChange={(e) => setPlaylist(e.target.value)} required>
                        <option value="">Select a playlist</option>
                        {playlistOptions.map((playlist, index) => (
                            <option value={playlist} key={index}>{playlist}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="videoFile">Select Video File</label>
                    <input
                        type="file"
                        id="videoFile"
                        accept="video/*"
                        ref={VideoFileInputRef}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ThumbnailFile">Select a Video Thumbnail</label>
                    <input
                        type="file"
                        id="ThumbnailFile"
                        accept="image/*"
                        ref={ThumbnailFileInputRef}
                        required
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="submit-btn">Upload Video</button>
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel Upload</button>
                </div>
            </form>
        </div>
    );
}

export default UploadVideo;
