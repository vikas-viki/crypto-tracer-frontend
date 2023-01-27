import { Container, Box, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useContext } from 'react';
import "../../Css/login.css";
import jwt_decode from 'jwt-decode';
import portContext from "../../Context/portfolio/portfolioContext"
import userContext from '../../Context/user/user_context';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const GoogleclientId = "672910961327-o4a65hd4382k9inpd9ajosp43ug5jthm.apps.googleusercontent.com";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';


const Login = () => {
  const usercontext = useContext(userContext);
  const { setUsername, setUseremail, setUserpic } = usercontext;
  const {hello} = useContext(portContext);
console.log(hello)
  function handleCredentialLoginResponse(response) {
    var userObj = jwt_decode(response.credential);
    console.log(userObj);

    setUserpic(userObj.picture);
    setUseremail(userObj.email);
    setUsername(userObj.username);
  }


  return (

    <form style={{
      width: "100%",
      height: "100%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Container sx={{
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography variant='h4' className='login-heading' pb={3}>Login to account</Typography>
        <Box>
          <TextField id="outlined-basic " label="Email" type={'email'} className='input-login' variant="outlined" /><br />

          <TextField id="outlined-basic2" label="Password" type={'password'} className='input-login' variant="outlined"
            sx={{
              marginTop: '30px'
            }} />
          <Typography sx={{ textAlign: 'right' }}>Don't have account? signup <Link to="/signup">here</Link> </Typography>
        </Box>
        <Button variant="outlined" color="secondary" type='submit' sx={{ width: '165px', marginTop: '30px' }}>Login</Button>
        <Box
          sx={{ display: 'flex', gap: '18px', marginTop: '20px' }}
        >

          <GoogleOAuthProvider clientId={GoogleclientId}>
            <GoogleLogin
              theme="filled_black"
              shape='pill'
              onSuccess={handleCredentialLoginResponse}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
        </Box>
      </Container>
    </form>
  )
}

export default Login