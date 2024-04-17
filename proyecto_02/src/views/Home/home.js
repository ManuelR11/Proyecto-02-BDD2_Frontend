// Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Sidebar from "../../components/Sidebar/sidebar.js";
import Tweet from "../../components/tweet/tweet.js";

function Home() {
    const [buttonPressInfo, setButtonPressInfo] = useState({});

    const handleButtonPress = (buttonType, pressed) => {
        setButtonPressInfo({ type: buttonType, pressed: pressed });
    };

    useEffect(() => {
        // Aquí puedes usar la información de buttonPressInfo según sea necesario
        console.log("Button pressed:", buttonPressInfo);
    }, [buttonPressInfo]);

    return (    
        <div className="home">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="tweets">
                <h1>For you</h1>
                <Tweet 
                    nombre="Manuel Rodas 11" 
                    date="Date" 
                    tweetContent="El primer tweet" 
                    comentario1="El BICHOOOOOOO" 
                    comentario2="SIUUUUUUUUUUUUUUUUUUUUUUUUUUUU" 
                    onButtonPress={handleButtonPress}
                    showDeleteButton={true}
                />
                <Tweet/>
                <Tweet/>
                <Tweet/>
                <Tweet/>
            </div>    
        </div>
    );
}

export default Home;
