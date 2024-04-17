import React, { useState, useEffect } from 'react';
import './profile.css';
import Sidebar from "../../components/Sidebar/sidebar";
import RecipeReviewCard from '../../components/tweet/tweet';
import axios from 'axios';

const Profile = ({ loggedInUser, setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [postedTweets, setPostedTweets] = useState([]);
  const [likedTweets, setLikedTweets] = useState([]);
  const [currentContentType, setCurrentContentType] = useState('tweets');

  useEffect(() => {
    if (loggedInUser) {
      setUsername(loggedInUser);

      axios.get(`http://18.221.157.193:3161/tweets/posted/${loggedInUser}`)
        .then(response => {
          setPostedTweets(response.data);
        })
        .catch(error => {
          console.error('Error fetching posted tweets:', error);
        });

      axios.get(`http://18.221.157.193:3161/tweets/liked/${loggedInUser}`)
        .then(response => {
          setLikedTweets(response.data);
        })
        .catch(error => {
          console.error('Error fetching liked tweets:', error);
        });
    }
  }, [loggedInUser]);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.post('http://18.221.157.193:3161/users/updateUsername', {
        username: loggedInUser,
        new_username: username,
      });

      if (response.data.success) {
        setLoggedInUser(username);
        setEditMode(false);
      } else {
        // Mostrar mensaje de error al usuario
        alert('No se pudo actualizar el nombre de usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el nombre de usuario:', error);
      // Mostrar mensaje de error al usuario
      alert('Ocurrió un error al actualizar el nombre de usuario');
    }
  };

  const handleContentChange = (contentType) => {
    setCurrentContentType(contentType);
  };
  const handleDeleteTweet = async (tweetId) => {
    try {
      const response = await axios.post('http://18.221.157.193:3161/tweets/delete', {
        id: tweetId,
      });
  
      console.log('Response:', response.data); // Agregamos esta línea para verificar la respuesta del servidor
  
      if (response.data.success) {
        // Actualizar el estado de los tweets
        if (currentContentType === 'tweets') {
          setPostedTweets(postedTweets.filter(tweet => tweet.id !== tweetId));
        } else {
          setLikedTweets(likedTweets.filter(tweet => tweet.id !== tweetId));
        }
      } else {
        // Mostrar mensaje de error al usuario
        alert('No se pudo borrar el tweet');
      }
    } catch (error) {
      console.error('Error al borrar el tweet:', error);
      // Mostrar mensaje de error al usuario
      alert('Ocurrió un error al borrar el tweet');
    }
  };
  

  const handleButtonPress = (type, tweet) => {
    if (type === "delete") {
      console.log("Tweet ID a borrar:", tweet.id);
      handleDeleteTweet(tweet.id);
    } else {
      console.log(`Botón ${type} presionado para el tweet con ID: ${tweet.id}`);
    }
  };

  const formatDate = (date) => {
    if (typeof date === 'object') {
      return `${date.year.low}-${date.month.low}-${date.day.low}`;
    } else {
      const formattedDate = new Date(date);
      return `${formattedDate.getFullYear()}-${formattedDate.getMonth() + 1}-${formattedDate.getDate()}`;
    }
  };

  const renderTweets = (tweets) => {
    const likedTweetIds = likedTweets.map(tweet => tweet.id); 

    return (
      <div className="tweets-expanded">
        <h3>{currentContentType === 'likes' ? 'Likes' : 'Posts'}</h3>
        {tweets.map((tweet, index) => {
          const isLiked = likedTweetIds.includes(tweet.id);
          return (
            <div key={index} style={{ marginLeft: '20%' }}>
              <RecipeReviewCard
                nombre={currentContentType === 'tweets' ? loggedInUser : tweet.author}
                date={formatDate(tweet.fecha)} 
                tweetContent={tweet.texto}
                comentario1="Comentario 1"
                comentario2="Comentario 2"
                onButtonPress={(type) => handleButtonPress(type, tweet)}
                liked={isLiked} 
                tweetHashtags={tweet.hashtags} // Propiedad para los hashtags
                tweetLinks={tweet.links} // Propiedad para los enlaces
                showDeleteButton={true} // Mostrar el botón de borrar
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='sidebar'>
      <Sidebar />
      <div className="profile-container" style={{ marginLeft: '250px' }}>
        <div className="profile-header">
          <div className="profile-info">
            {editMode ? (
              <div className="profile-edit">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button className="profile-save-button" onClick={handleSaveProfile}>
                  Guardar
                </button>
              </div>
            ) : (
              <div className="profile-display">
                <h2>{loggedInUser}</h2>
                <button className="profile-edit-button" onClick={handleEditProfile}>
                  Editar perfil
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="profile-content">
          <div className="posts" onClick={() => handleContentChange('tweets')}>
            <p className="posts-text">Posts</p>
          </div>
          <div className="likes" onClick={() => handleContentChange('likes')}>
            <p className="likes-text">Likes</p>
          </div>
        </div>
        <div className="expanded-section">
          {currentContentType === 'tweets' && renderTweets(postedTweets)}
          {currentContentType === 'likes' && renderTweets(likedTweets)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
