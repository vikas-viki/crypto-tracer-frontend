import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "../Css/coin_card.css"
import { Grid, Tooltip } from '@mui/material';
import coin_context from '../Context/Coin_context';

const Coin_card = (props) => {

    const MainState = useContext(coin_context);

    const { symbol, setSelectedCoin, theme } = MainState


    return (
        <Card  style={{width: "90%", background: theme === 'dark' && 'linear-gradient(-105deg, #813FE4, #4F1BB1)'}} className="main_card_container" id='each_coin_card'  onClick={() => { setSelectedCoin(props.id) }}>
            <CardContent >
                <Grid container spacing={1} sx={{ alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                    <Grid item xs={2} >

                        <CardMedia
                            component="img"
                            sx={{
                                paddingLeft: "5px",
                                width: "40px",
                                height: "40px",
                            }}
                            image={props.image}
                        />
                    </Grid>
                    <Grid item xs={4} >

                        <Typography
                            sx={{
                                fontSize: "20px",
                                textAlign: "left",
                                color: "black",
                                position: "relative",
                                color: theme === 'dark' && "white"
                            }}>{props.title}</Typography>
                    </Grid>
                    <Grid item xs={4} >
                        <Typography
                            className='price'
                            sx={{
                                position: "relative",
                                fontWeight: 600,
                                textAlign: "right",
                                fontSize: "18px",
                                fontFamily: "Nunito",
                                padding: 0,
                                color: theme === 'dark' ? '#fff' : "#000a21",
                                marginRight: "5px"
                            }}>{symbol + new Intl.NumberFormat(symbol === '$' ? 'en-US' : 'hi-IN').format((symbol === '$' ? parseFloat(props.price).toFixed(2) : Math.round(props.price)))}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Tooltip title="24 Hour change">
                            <Typography
                                sx={{
                                    color: `${props.price24HC < 0 ? theme === 'dark' ? '#ff4400' : "red" : theme === 'dark' ? '#4af700' :"green"}`,
                                    fontFamily: "Dosis",
                                    fontWeight: "bold"
                                }}
                            >{(props.price24HC !== null ? props.price24HC : 0.00).toFixed(2) + '%'}</Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Coin_card