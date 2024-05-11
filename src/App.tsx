import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/header/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Flowers from './pages/flowers';
import FavoriteFlowers from './pages/favorite-flowers';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './store/auth';
import LatestSlights from './pages/latest-slights';
import { RootState } from './store';
import AxiosInstance, { setAuthToken } from './services/axios';
import { loginUser } from './store/auth';

import { setUser } from './store/profile';
import { Auth_Token } from './interfaces/Token';


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.profile.userProfile)

  const token = localStorage.getItem('token') as string;

  const loginData: Auth_Token = {
    auth_token: token
  };
  const getUserData = async () => {
    if (!user && token) {
      setAuthToken(token)
      try {
        const response = await AxiosInstance.get(`/api/v1/users/me`);
        dispatch(loginUser(loginData))
        dispatch(setUser(response.data.user));
      } catch (error) {

      }

    }
  }

  useEffect(() => {

    getUserData();

  }, [user])
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Flowers />} />
          <Route path="/latest-slights" element={<LatestSlights />} />
          <Route path="/favorite" element={<FavoriteFlowers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
