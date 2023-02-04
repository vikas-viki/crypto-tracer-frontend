import React, { useContext, useEffect, useState } from "react";
import "../Css/about_coin.css"
import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import coin_context from "../Context/Coin_context";
import { Box } from "@mui/system";
import Link from '@mui/material/Link';
import parse from 'html-react-parser';

export default function About_coin() {

    const MainState = useContext(coin_context);

    const { scData, loaded, currency, symbol, theme } = MainState;


    let data = loaded && scData.description.en.split(". ")[0];

    const formatter = new Intl.NumberFormat(symbol === '$' ? 'en-US' : 'hi-IN', {
        style: 'currency',
        currency: currency,
    });
    return (
        <>
            <Grid
                sx={{
                    
                    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
                }} container spacing={1} id="about-container" className="about_container"
            >
                {loaded &&
                    <>
                        <Grid item xs={8}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    flexDirection: "column",
                                    paddingBottom: "5px",
                                    paddingLeft: "5px",
                                    paddingTop: "5px",
                                    paddingRight: "5px",
                                    color: theme === 'dark' && "#fff"
                                }}
                            >
                                <img src={scData.image.large} alt="image" width={70} height={70} /><br />
                                <Typography variant="h4"
                                    sx={{ position: "relative", top: "-10px", left: "10px", color: theme === 'dark' && "white" }}>
                                    {scData.name}
                                </Typography>
                            </Box>
                            <Typography sx={{ position: "relative", top: "-10px", left: "10px", color: theme === 'dark' && "white" }} className="coin_description">
                                {parse(data)}.<br />
                                For more information visit <Link href={scData.links.homepage[0]} target="_blank">Official website</Link>.
                            </Typography>
                        </Grid>
                        <Divider />
                        <Grid item xs={4}>
                            <Typography sx={{
                                fontSize: "25px",
                                fontFamily: "poppins",
                                color: theme === 'dark' && "white"
                            }}>
                                Rank: <span id="description_rank">{scData.market_cap_rank}</span>
                            </Typography>
                            <Typography sx={{
                                fontSize: "25px",
                                fontFamily: "poppins",
                                color: theme === 'dark' && "white"
                            }}>
                                Price: <span id="description_price">{symbol}{new Intl.NumberFormat(symbol === '$' ? 'en-US' : 'hi-IN').format(scData.market_data.current_price[currency.toLowerCase()])}</span>
                            </Typography>
                            <Typography sx={{
                                fontSize: "25px",
                                fontFamily: "poppins",
                                color: theme === 'dark' && "white"
                            }}>
                                Market cap: <span id="description_price">{symbol}{scData.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -9)}B</span>
                            </Typography>
                            {/* <input type='color' onChange={(e) => {document.getElementById("about-container").style.backgroundColor = e.target.value}}/> */}

                        </Grid>
                    </>
                }
            </Grid>

        </>

    )
}

/* 
{scData.description.en.split(". ")[0].length > 190 ?
                                scData.description.en.split(". ")[0].slice(0, 190) + "..." 
                                const propName = 'foo';
const fooValue = obj[propName]; // fooValue is equal to obj.foo
//C seminar
                                */