import { Container, Typography } from '@mui/material'
import "../Css/PORTFOLIO.css"
import { Link, Route, Routes } from 'react-router-dom'
import React, { useContext } from 'react'
import userContext from '../Context/user/user_context'


const Portfolio = () => {
  const user = useContext(userContext);
  const { loggedIn, setLoggedIn } = user;
  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', height: "100Vh" }}>
      {loggedIn &&
        <>
          <span className='nothing-emoji'>🔍</span><br />
          <Typography className='login-link-text'> Login <Link to="/login" className='login-link'>here</Link> to your account to access transactions</Typography>
        </>
      }
      <Typography>Your transactions</Typography>


    </Container>
  )
}

export default Portfolio