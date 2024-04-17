import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './views/Register/register.js';
import Login from './views/LogIn/login.js';
import Profile from './views/Profile/profile.js';
import Bookmarks from './views/Bookmarks/Bookmarks.js';
import Explore from './views/explore/explore.js';
import Home from './views/Home/home.js';


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/Profile" element={<Profile loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
        <Route path="/Explore" element={<Explore loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />} />
        <Route path="/Bookmarks" element={<Bookmarks loggedInUser={loggedInUser} />} />
        <Route path="/Home" element={<Home loggedInUser={loggedInUser} />} />
      </Routes>
    </Router>
  );
}

export default App;