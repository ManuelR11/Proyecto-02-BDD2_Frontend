import React, { useState, useEffect } from 'react';
import './Bookmarks.css';
import Sidebar from "../../components/Sidebar/sidebar";
import RecipeReviewCard from '../../components/tweet/tweet';
import axios from 'axios';

const Bookmarks = ({ loggedInUser }) => {
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
  const [likesCounts, setLikesCounts] = useState({});

  useEffect(() => {
    loadBookmarkedTweets();
  }, [loggedInUser]);

  const loadBookmarkedTweets = () => {
    axios.get(`http://18.221.157.193:3161/tweets/saved/${loggedInUser}`)
      .then(response => {
        setBookmarkedTweets(response.data);
        // Obtener el conteo de likes para los tweets bookmarkeados
        response.data.forEach(tweet => {
          fetchLikesCount(tweet.id);
        });
      })
      .catch(error => {
        console.error('Error fetching bookmarked tweets:', error);
      });
  };

  const fetchLikesCount = async (tweetId) => {
    try {
      const response = await axios.post('http://18.221.157.193:3161/tweets/likes', {
        id: tweetId
      });
      const likesCount = response.data.likesCount;
      // Actualizar el estado de likesCounts con el conteo de likes para este tweet
      setLikesCounts(prevState => ({
        ...prevState,
        [tweetId]: likesCount
      }));
    } catch (error) {
      console.error('Error fetching likes count:', error);
    }
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
              nombre={tweet.author}
              date={formatDate(tweet.fecha)}
              tweetContent={tweet.texto}
              comentario1="Comentario 1"
              comentario2="Comentario 2"
              onButtonPress={handleButtonPress}
              tweetHashtags={tweet.hashtags}
              tweetLinks={tweet.links}
            />
            {/* Mostrar el conteo de likes desde el estado */}
            <p>Likes: {likesCounts[tweet.id] || 0}</p>
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