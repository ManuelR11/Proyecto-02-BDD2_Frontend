import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Sidebar from "../../components/Sidebar/sidebar.js";
import Tweet from "../../components/tweet/tweet.js";
import axios from 'axios';

// Función para formatear la fecha
const formatDate = (date) => {
    if (typeof date === 'object') {
        return `${date.year.low}-${date.month.low}-${date.day.low}`;
    } else {
        const formattedDate = new Date(date);
        return `${formattedDate.getFullYear()}-${formattedDate.getMonth() + 1}-${formattedDate.getDate()}`;
    }
};

function Home() {
    const [tweets, setTweets] = useState([]);
    const [buttonPressInfo, setButtonPressInfo] = useState({});

    const handleButtonPress = (buttonType, pressed) => {
        setButtonPressInfo({ type: buttonType, pressed: pressed });
    };

    useEffect(() => {
        // Llamada a la API para obtener los tweets
        axios.get('http://18.221.157.193:3161/tweets')
            .then(response => {
                // Actualizar el estado con la información de los tweets recibidos
                setTweets(response.data);
            })
            .catch(error => {
                console.error('Error fetching tweets:', error);
            });
    }, []); // El array vacío asegura que esta llamada solo se realice una vez al cargar el componente

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
                {tweets.map((tweet, index) => (
                    <Tweet 
                        key={index}
                        nombre={tweet.author}
                        date={formatDate(tweet.fecha)}
                        tweetContent={tweet.texto}
                        tweetHashtags={tweet.hashtags}
                        tweetLinks={tweet.links}
                        onButtonPress={handleButtonPress}
                    />
                ))}
            </div>    
        </div>
    );
}

export default Home;