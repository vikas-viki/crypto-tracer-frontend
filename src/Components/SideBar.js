import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../Css/sidebar.css";
import { Button, Tooltip } from "@mui/material";
import coin_context from "../Context/Coin_context";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
            <div className="user_profile">
                {userpic ?
                    <img className="user_pic" src={userpic} alt="user_pic" />
                :
                    <span>User</span>
                }
            </div>
            <div className="App_name_container">
                <span>Crypto re-viewer</span>
            </div>
            <div className="Side_bars">
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/watchlist">Watchlist</NavLink>
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