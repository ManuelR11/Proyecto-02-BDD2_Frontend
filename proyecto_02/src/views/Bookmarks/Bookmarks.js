import React, { useState, useEffect } from 'react';
import './Bookmarks.css'; // Asegúrate de tener un archivo CSS para los estilos
import Sidebar from "../../components/Sidebar/sidebar";
import RecipeReviewCard from '../../components/tweet/tweet';
import axios from 'axios';

const Bookmarks = ({ loggedInUser }) => {
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);

  useEffect(() => {
    loadBookmarkedTweets();
  }, [loggedInUser]);

  const loadBookmarkedTweets = () => {
    axios.get(`http://18.221.157.193:3161/tweets/saved/${loggedInUser}`)
      .then(response => {
        setBookmarkedTweets(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookmarked tweets:', error);
      });
  };

  const handleButtonPress = (type, tweet) => {
    console.log(`Botón ${type} presionado para el tweet con ID: ${tweet.id}`);
    // Lógica para manejar los botones de los tweets si es necesario
  };

  const formatDate = (date) => {
    if (typeof date === 'object') {
      return `${date.year.low}-${date.month.low}-${date.day.low}`;
    } else {
      const formattedDate = new Date(date);
      return `${formattedDate.getFullYear()}-${formattedDate.getMonth() + 1}-${formattedDate.getDate()}`;
    }
  };

  const renderBookmarkedTweets = (tweets) => {
    return (
      <div className="bookmarks-expanded">
        <h3>Bookmarks</h3>
        {tweets.map((tweet, index) => (
          <div key={index} style={{ marginLeft: '20%' }}>
            <RecipeReviewCard
              nombre={tweet.author} // Nombre del autor
              date={formatDate(tweet.fecha)} // Fecha del tweet
              tweetContent={tweet.texto} // Contenido del tweet
              comentario1="Comentario 1"
              comentario2="Comentario 2"
              onButtonPress={handleButtonPress} 
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='bookmarks-container'>
      <Sidebar />
      <div className="expanded-section">
        {renderBookmarkedTweets(bookmarkedTweets)}
      </div>
    </div>
  );
};

export default Bookmarks;
