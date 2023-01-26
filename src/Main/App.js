import React from 'react';
import "../Css/APP.css";
import SideBar from "../Components/SideBar";
import Home from "../Pages/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Portfolio from '../Pages/Portfolio';
import Watchlist from '../Pages/Watchlist';
import Login from '../Components/Profile/Login';
import Signup from '../Components/Profile/Signup';

const App = () => {
  return (
    <BrowserRouter>
      <div className="Main_container">
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/profile' element={<Portfolio />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path="/watchList" element={<Watchlist />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App