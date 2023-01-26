import { Container, Typography } from '@mui/material'
// import { Box } from '@mui/system'
import "../Css/PORTFOLIO.css"
import { Link, Route, Routes } from 'react-router-dom'
import React from 'react'

const Portfolio = () => {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', height: "100Vh" }}>
      <span className='nothing-emoji'>🔍</span><br />
      <Typography className='login-link-text'> Login <Link to="/login" className='login-link'>here</Link> to your account to access transactions</Typography>
      

    </Container>
  )
}

export default Portfolio