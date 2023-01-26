import { Container, Box, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import "../../Css/login.css";
import userContext from '../../Context/user_context';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const GoogleclientId = "672910961327-o4a65hd4382k9inpd9ajosp43ug5jthm.apps.googleusercontent.com";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const usercontext = useContext(userContext);
  const { setUsername, setUseremail, setUserpic } = usercontext;

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObj = jwt_decode(response.credential);
    console.log(userObj);

  }



  return (
    <form style={{
      width: "100%",
      height: "100%",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }} onSubmit={(e) => { e.preventDefault() }}>
      <Container sx={{
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography variant='h4' className='login-heading' pb={3}>Create new account</Typography>
        <Box>
          <TextField id="outlined-basic0 " label="Name" type={'text'} className='input-login' variant="outlined" /><br />
          <TextField id="outlined-basic1 " label="Email" type={'email'} className='input-login' variant="outlined" sx={{
            marginTop: '30px'
          }} /><br />

          <TextField id="outlined-basic2" label="Password" type={'password'} className='input-login' variant="outlined"
            sx={{
              marginTop: '30px'
            }} />
          <Typography sx={{ textAlign: 'right' }}>Have an account already? Login <Link to="/login">here</Link> </Typography>
        </Box>
        <Button variant="outlined" color="secondary" type='submit' sx={{ width: '165px', marginTop: '30px' }}>Signup</Button>
        <Box
          sx={{ display: 'flex', gap: '18px', marginTop: '20px', cursor: 'pointer' }}
        >
          <GoogleOAuthProvider clientId={GoogleclientId}>
            <GoogleLogin
              onSuccess={handleCredentialResponse}
              theme="filled_black"
              shape='pill'
              text='signup_with'
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

export default Signup
