import React, { useState, useEffect } from 'react';
import coin_context from "./Coin_context";
import axios from "axios"

const MainState = (props) => {


  // Currency State
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
    if (event.target.value == "INR") {
      setSymbol("₹");
    } else {
      setSymbol("$");
    }
    return (
      true
    )
  };

  // Getting all coin details.
  const [renderingData, setrenderingData] = useState([])
  const [allCoinsData, setAllCoinsData] = useState([]);

  const getAllCoinsdata = () => {
    axios.get(`
    https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=250&page=1&sparkline=false`)
      .then((data) => {
        setAllCoinsData(data.data);
        setrenderingData(data.data);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  // Fetching data from coinGeko
  useEffect(() => {
    getAllCoinsdata();
  }, [currency]);

  // for having gainers filter
  const Togaineres = () => {
    let tGD = allCoinsData.slice().sort((a, b) => {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    })
    setrenderingData(tGD);
  }

  //for having loosers filter
  const Loosers = () => {
    let tGD = allCoinsData.slice().sort((a, b) => {
      return a.price_change_percentage_24h - b.price_change_percentage_24h;
    })
    setrenderingData(tGD);
  }

  //for showing chart 
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [scData, setScData] = useState([])
  const [loaded, setLoaded] = useState(false);

  const getSelectedCoinData = (coin) => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`)
      .then((data) => {
        // console.log((data.data.description.en).split(". ")[0]);
        // console.log((data.data.links.homepage)[0]);
        setScData(data.data);
        setLoaded(true);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  useEffect(() => {
    getSelectedCoinData(selectedCoin);
  }, [selectedCoin])


  // For chart data

  const [chartData, setChartData] = useState();
  const [chartTimePeriod, setChartTimePeriod] = useState(1);
  const getChartData = () => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=${currency.toLowerCase()}&days=${chartTimePeriod}`)
      .then(({data}) => {
        setChartData(data.prices);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  useEffect(() => {
    getChartData();
  }, [currency , chartTimePeriod , selectedCoin])

  // For search functionality
  const filtertheSearch=(e)=>{
    let filtered = allCoinsData.slice().filter((el,i)=>{
      return el.name.toLowerCase().includes(e.target.value);
    })
    setrenderingData(filtered);
  }

  // For color theming

  const [theme, setTheme] = useState('light');

  return (

    <coin_context.Provider
      value={{
        handleCurrencyChange,
        currency,
        symbol,
        allCoinsData,
        Togaineres,
        Loosers,
        getAllCoinsdata,
        selectedCoin,
        setSelectedCoin,
        scData,
        loaded,
        chartData,
        chartTimePeriod,
        setChartTimePeriod,
        getChartData,
        renderingData,
        filtertheSearch,
        theme, 
        setTheme
      }}>
      {props.children}
    </coin_context.Provider>


  )
}

export default MainState

/*
1. Top Gainers.
2. Looseres.
3. Ranking.
4. Selected coin data.
5. chart time data - 1D ...


*/