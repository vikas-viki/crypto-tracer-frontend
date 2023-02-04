import React, { useContext, useState, useEffect } from "react";
import Coin_Chart from "../Components/Chart";
import About_coin from "../Components/About_coin";
import "../Css/HOME.css";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Coin_card from "../Components/Coin_card";
import { Box } from "@mui/system";
import coin_context from "../Context/Coin_context";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderBottomLeftRadius: "10px",
  borderBottomRightRadius: "10px",
  backgroundColor: "#f0f4f5",
  border: "0.2px solid grey",
  borderTopColor: "none",
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.20),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '23ch',
      '&:focus': {
        width: '27ch',
      },
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function Home() {


  const MainState = useContext(coin_context)
  const { Togaineres, Loosers, getAllCoinsdata, renderingData, filtertheSearch, theme } = MainState;

  return (
    <div className="main_home_container" id="main_home_container">
      {/* <input type='color' onChange={(e) => {document.getElementById("main_home_container").style.backgroundColor = e.target.value}}/> */}
      <Container 
      sx={{
        display: 'flex',
        justifyContent: "center"
      }}
      >
        <Box className="chart_about_container"   >
          <Coin_Chart />
          <About_coin />
        </Box>
        <Box
          sx={{
            height: "780px",
            marginLeft: "20px",
            marginTop: "13px",
            border: "1px solid grey",
            borderRadius: "7px",
            background: theme === 'dark' && '#813FE4',
            boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
          }}
          className="coins_list_item">
          <Container
            className="coins_list"
            maxWidth="sm"
            id="coins-list-container"
            sx={{
              margin: "0px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff"
            }}>
              {/* <input type='color' onChange={(e) => {document.getElementById("coins-list-container").style.backgroundColor = e.target.value}}/> */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{color: theme === 'dark' && 'white'}} />
              </SearchIconWrapper>
              <StyledInputBase
              sx={{color: theme === 'dark' && 'white' }}
                placeholder="Search a coin..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => { filtertheSearch(e) }}
              />
            </Search>
            <Stack
              direction="row"
              className="filtering_buttons_container"
              sx={{
                position: "sticky",
                top: "0px",
                overflow: "hidden",
                paddingTop: "15px",
                paddingBottom: "15px",
                borderBottom: "1px solid grey",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: theme === 'dark' ? '#813FE4' : '#fff',
                zIndex: 2
              }}
              spacing={1}>

              <Button className="filtering-btn" variant="outlined" style={{ color: theme === 'dark' && '#fff', borderColor: theme === 'dark' && '#fff',  }} color={"info"} onClick={Togaineres}>Top Gainers</Button>
              <Button className="filtering-btn" variant="outlined" style={{ color: theme === 'dark' && '#fff', borderColor: theme === 'dark' && '#fff',  }} color={"info"} onClick={Loosers}>Loosers</Button>
              <Button className="filtering-btn" variant="outlined" style={{ color: theme === 'dark' && '#fff', borderColor: theme === 'dark' && '#fff',  }} color={"info"} onClick={getAllCoinsdata}>Ranking</Button>
            </Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginLeft: "20px",
                marginTop: "10px",
                marginRight: "20px",
                gap: '15px',
                backgroundColor: "#fff"
              }}
              className="coin_card_list">
                {/* <input type='color' onChange={(e) => {document.getElementById("each_coin_card").style.backgroundColor = e.target.value}}/> */}
              {
                renderingData.map((el, i) => {
                  return <Coin_card
                    title={el.name}
                    id={el.id}
                    price={el.current_price}
                    image={el.image}
                    price24HC={el.price_change_percentage_24h}
                    key={i}
                  />
                })
              }
            </Box>
          </Container>
        </Box>
      </Container>
    </div>
  );
}
