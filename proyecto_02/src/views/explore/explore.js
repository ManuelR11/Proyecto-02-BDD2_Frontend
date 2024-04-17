import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/Sidebar/sidebar";
import RecipeReviewCard from '../../components/tweet/tweet';
import './explore.css';

const Explore = ({ loggedInUser }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [likesCounts, setLikesCounts] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://18.221.157.193:3161/tweets/search', { texto: searchText });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching tweets:', error);
    }
  };

  const fetchLikesCount = async (tweetIds) => {
    try {
      const response = await axios.post('http://18.221.157.193:3161/tweets/likes', tweetIds);
      const likesData = response.data;
      setLikesCounts(likesData.reduce((acc, curr) => {
        acc[curr.id] = curr.likesCount;
        return acc;
      }, {}));
    } catch (error) {
      console.error('Error fetching likes count:', error);
    }
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      const tweetIds = searchResults.map(tweet => tweet.id);
      fetchLikesCount(tweetIds);
    }
  }, [searchResults]);

  const formatDate = (date) => {
    if (typeof date === 'object') {
      return `${date.year.low}-${date.month.low}-${date.day.low}`;
    } else {
      const formattedDate = new Date(date);
      return `${formattedDate.getFullYear()}-${formattedDate.getMonth() + 1}-${formattedDate.getDate()}`;
    }
  };

  return (
    <div className="explore-container">
      <Sidebar />
      <div className="explore-content">
        <h1>Explorar Tweets</h1>
        <form onSubmit={handleSearch}>
          <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar tweets..." />
          <button type="submit">Buscar</button>
        </form>
        <div className="search-results">
          {searchResults.map((tweet, index) => (
            <div key={index} className="tweet">
              <RecipeReviewCard
                nombre={tweet.author}
                date={formatDate(tweet.fecha)}
                tweetContent={tweet.texto}
                comentario1="Comentario 1"
                comentario2="Comentario 2"
                liked={false}
                tweetHashtags={tweet.hashtags}
                tweetLinks={tweet.links}
              />
              {/* Mostrar el conteo de likes desde el estado */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
