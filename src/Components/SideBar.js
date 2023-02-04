import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../Css/sidebar.css";
import { Tooltip } from "@mui/material";
import coin_context from "../Context/Coin_context";
import user from "../assets/user.png"
import watchlist from "../assets/bookmark.png"
import barChart from "../assets/bar-chart.png"
import Switch from '@mui/material/Switch';
import userContext from "../Context/user/user_context";

export default function SideBar() {
    const userState = useContext(userContext);
    const { username, useremail, userpic } = userState;
    const MainState = useContext(coin_context);
    const { setTheme } = MainState;
    const setDarkTheme = () => {
        setTheme('dark');
        document.getElementById("main-chart-container").style.background = '#4F1BB1';
        document.getElementById("about-container").style.backgroundColor = '#813FE4';
        document.getElementById("coins-list-container").style.backgroundColor = '#813FE4';
        document.getElementById("Sidebar_container").style.backgroundColor = '#813FE4';
        document.getElementById("Sidebar_container").style.color = '#fff';
    }
    const setLightTheme = () => {
        setTheme('light')
        document.getElementById("main-chart-container").style.background = 'white';
        document.getElementById("about-container").style.backgroundColor = 'white';
        document.getElementById("coins-list-container").style.backgroundColor = 'white';
        document.getElementById("main_home_container").style.backgroundColor = 'white';
        document.getElementById("Sidebar_container").style.backgroundColor = 'white';
        document.getElementById("Sidebar_container").style.color = 'black';

    }
    return (
        <div className="Sidebar_container" id="Sidebar_container" style={{ backgroundColor: "#fff" }}>
            <span>

                <div className="user_profile">
                    {userpic ?
                        <img className="user_pic" src={userpic} alt="user_pic" />
                        :
                        <span>User</span>
                    }
                </div>
                <div className="App_name_container">
                    <span>Crypto Tracer</span>
                </div>
            </span>
            <div className="Side_bars">
                <NavLink to="/"><img src={barChart} width='23' alt='D' /><span className="nav-hide dashboard">Dashboard</span></NavLink>
                <NavLink to="/profile"><img src={user} width='23' alt='P' /><span className="nav-hide">Profile</span></NavLink>
                <NavLink to="/watchlist"><img src={watchlist} width='23' alt='W' /><span className="nav-hide">Watchlist</span></NavLink>
            </div>
            <div className="theme-setter" >

                <Tooltip title="Dark Theme">

                    <Switch onChange={(e) => { e.target.checked ? setDarkTheme() : setLightTheme() }} />
                </Tooltip>

                {/* <input type='color' onChange={(e) => {document.getElementById("Sidebar_container").style.backgroundColor = e.target.value}}/> */}
            </div>
        </div>
    )
}