import React, { useContext, createRef, useRef, useEffect } from "react";
import coin_context from "../Context/Coin_context";
import "../Css/chart.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import { Button, Divider, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import gradient from 'chartjs-plugin-gradient';

import {
    Chart as ChartJS,
    registerables
} from 'chart.js';
ChartJS.register(
    gradient,
    ...registerables,
);

import 'chartjs-adapter-moment';



export default function Coin_Chart() {
    const {
        handleCurrencyChange,
        currency,
        chartData,
        selectedCoin,
        chartTimePeriod,
        symbol,
        setChartTimePeriod,
        theme,
    } = useContext(coin_context);

    const modifyTitle = (title) => {
        if (chartTimePeriod === 1) {
            return title[0].label.slice(14, 18) + title[0].label.slice(-3)
        }
        if (chartTimePeriod === 7 || chartTimePeriod === 30 || chartTimePeriod === 365) {
            return title[0].label.slice(0, 8) + title[0].label.slice(14, 18) + title[0].label.slice(-3);
        }
        return title[0].label.slice(0, 12)
    }
    const modifLabel = (label) => {
        if (symbol === '$') {
            return symbol + " " + label.formattedValue
        }
        return symbol + " " + label.formattedValue.split(".")[0];
    }
    return (
        <>
            <Box sx={{
                padding: 0,
                backgroundColor: "#fff",
                boxShadow: "rgba(3, 102, 214, 0.6) 0px 0px 0px 3px"
            }}
                id="main-chart-container"
                className="main-chart-container">

                <div className="chart_container">
                    <Container maxWidth="sm" className="chart-container-1">
                        <Box sx={{ maxWidth: 90 }}>
                            <FormControl fullWidth >
                                <InputLabel id="currency_select"
                                    sx={{ color: theme === 'dark' && '#fff' }} >Currency</InputLabel>
                                <Select
                                    labelId="currency_select"
                                    id="demo-simple-currency_select"
                                    label="currency"
                                    value={currency}
                                    onChange={handleCurrencyChange}
                                    sx={{ color: theme === 'dark' && '#fff' }}
                                >
                                    <MenuItem value={"USD"}>USD</MenuItem>
                                    <MenuItem value={"INR"}>INR</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Container>
                    <Container className="filtering-days-btn">
                        <Button style={{ color: theme === 'dark' && '#fff' }} onClick={() => { setChartTimePeriod(1) }} >1D</Button>
                        <Button style={{ color: theme === 'dark' && '#fff' }} onClick={() => { setChartTimePeriod(7) }} >1W</Button>
                        <Button style={{ color: theme === 'dark' && '#fff' }} onClick={() => { setChartTimePeriod(30) }} >1M</Button>
                        <Button style={{ color: theme === 'dark' && '#fff' }} onClick={() => { setChartTimePeriod(365) }} >1Y</Button>
                        <Button style={{ color: theme === 'dark' && '#fff' }} onClick={() => { setChartTimePeriod(1825) }} >5Y</Button>
                        {/* <input type='color' onChange={(e) => {document.getElementById("main-chart-container").style.backgroundColor = e.target.value}}/> */}
                    </Container>
                </div>
                <Divider />
                <div
                    className="chart"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center"
                    }}>
                    {
                        chartData ? (
                            <Line
                                id='chart'
                                data={{
                                    labels: chartData.map((coin) => {
                                        return new Date(coin[0]);
                                    }),
                                    datasets: [
                                        {
                                            fill: true,
                                            label: selectedCoin,
                                            data: chartData.map((coin) => { return coin[1] }),
                                            backgroundColor: "rgb(212, 224, 252,0.3)"

                                        },

                                    ]
                                }}

                                options={{

                                    elements: {
                                        point: {
                                            radius: 1,
                                            backgroundColor: "#001140",
                                        },
                                        line: {
                                            fill: "bottom",
                                            borderColor: "#7a9cfa",
                                            borderWidth: 2,
                                            tension: 0.1,
                                        },
                                    },
                                    scales: {
                                        y:
                                        {
                                            ticks: {

                                                color: theme === 'light' ? 'black' : 'white',
                                            },
                                            grid: {
                                                display: false,
                                            },
                                        },
                                        x:
                                        {
                                            type: 'time',
                                            ticks: {
                                                color: theme === 'light' ? 'black' : 'white',
                                            },
                                            time: {
                                                unit: () => {
                                                    if (chartTimePeriod === 1) {
                                                        return 'day'
                                                    } else if (chartTimePeriod === 7) {
                                                        return 'day'
                                                    } else if (chartTimePeriod === 30) {
                                                        return 'week'
                                                    } else if (chartTimePeriod === 365) {
                                                        return 'month'
                                                    } else {
                                                        return 'year'
                                                    }
                                                },
                                                displayFormats: {
                                                    month: 'MMM',
                                                }
                                            },
                                            grid: {
                                                display: false,
                                            },
                                        },
                                    },
                                    plugins: {
                                        tooltip: {
                                            enabled: true,
                                            intersect: false, // for showing tooltip nearer to the hover
                                            backgroundColor: '#012324',
                                            yAlign: 'top',
                                            displayColors: false,
                                            callbacks: {
                                                title: modifyTitle,
                                                label: modifLabel
                                            }

                                        },
                                        gradient: {
                                            enabled: true
                                        }, legend: {
                                            display: false,
                                            align: "end"
                                        }



                                    },

                                }}


                            />
                        ) : (
                            <span className="loader"></span>
                        )
                    }

                </div>
            </Box>

        </>
    )


}
