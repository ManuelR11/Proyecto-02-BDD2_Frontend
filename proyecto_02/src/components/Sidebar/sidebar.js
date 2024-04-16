import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";

function Sidebar() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
    };

    const handleExploreClick = () => {
        navigate("/explore");
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleBookmarksClick = () => {
        navigate("/profile");
    };

    const handlePostClick = () => {
        // Acción a realizar al hacer clic en "Post"
    };

    return (    
        <div className="sidebar">
            <div className="logo">
                <img src="https://graffica.ams3.digitaloceanspaces.com/2023/07/F1ySdm9WYAIbjHo-1024x1024.jpeg" style={{ width: '50px', height: '50px' }}/>
            </div>
            <div className="buttons">
                <button onClick={handleHomeClick}><AiFillHome style={{ marginBottom: '5px', marginRight: '15px', fontSize: '33px'  }} />Home</button>
                <button onClick={handleExploreClick}><AiOutlineSearch style={{ marginBottom: '5px', marginRight: '15px', fontSize: '33px'  }} />Explore</button>
                <button onClick={handleProfileClick}><AiOutlineUser style={{ marginBottom: '5px', marginRight: '15px', fontSize: '33px'  }} />Profile</button>
                <button onClick={handleBookmarksClick}><CiBookmark style={{ marginBottom: '5px', marginRight: '15px', fontSize: '33px'  }} />Bookmarks</button>
                <button className="round-button" onClick={handlePostClick} style={{ backgroundColor: "blue", width: '220px', height: '60px', textAlign: 'center' }}>Post</button>
            </div>
            <div className="post-button">
            </div>
        </div>
    );
}

export default Sidebar;
