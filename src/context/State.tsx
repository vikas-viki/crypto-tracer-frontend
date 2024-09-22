import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ChartData, Coin, ContextType, Days, DetailedCoin } from "./types";
import { defaultChartData, defaultSelectedCoin, test, tryCatch } from "./utils";

export const Context = createContext<ContextType>({
    allCoins: [],
    currency: "INR",
    chartTimePeriod: 1,
    chartData: defaultChartData,
    selectedCoin: defaultSelectedCoin,
    test: () => { },
    getGainers: () => { },
    getLoosers: () => { },
    setCurrency: () => { },
    getAllCoinsData: () => { },
    getSelectedCoinData: () => { },
    setChartTimePeriod: () => { },
    searchCoin: () => { },
    renderData: []
});

export default function State(props: React.PropsWithChildren): JSX.Element {
    const BASE_URL = `https://api.coingecko.com/api/v3/coins`;
    const API_KEY = `?x_cg_demo_api_key=${import.meta.env.VITE_COIN_GEKO_APIKEY}`;

    const [allCoins, setAllCoins] = useState<Coin[]>([]);
    const [renderData, setRenderData] = useState<Coin[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<DetailedCoin>(defaultSelectedCoin);
    const [currency, setCurrency] = useState("INR");
    const [chartData, setChartData] = useState<ChartData>(defaultChartData);
    const [chartTimePeriod, setChartTimePeriod] = useState<Days>(1);

    const getAllCoinsData = async () => {
        var data = await tryCatch(axios.get(`${BASE_URL}/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=250&page=1&sparkline=false${API_KEY}`));
        setAllCoins(data);
        setRenderData(data);
    }

    const getGainers = () => {
        let tGD = [...allCoins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        setRenderData(tGD);
    }

    const getLoosers = () => {
        let tLD = [...allCoins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        setRenderData(tLD);
    }

    const getSelectedCoinData = async (coin: string) => {
        var data = await tryCatch(axios.get(`${BASE_URL}/${coin}${API_KEY}`));
        setSelectedCoin(data);
    }

    const getChartData = () => {
        axios.get(`${BASE_URL}/${selectedCoin.id}/market_chart?vs_currency=${currency.toLowerCase()}&days=${chartTimePeriod}${API_KEY}`)
            .then(({ data }) => {
                setChartData(data);
                console.log({ chartData: data });
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const searchCoin = (text: string) => {
        var filteredData: Coin[] = [];
        allCoins.map((coin: Coin) => {
            if (coin.name.toLowerCase().includes(text) || coin.id.toLowerCase().includes(text)) {
                filteredData.push(coin);
            }
        });
        setRenderData(filteredData);
    }

    useEffect(() => {
        getChartData();
    }, [selectedCoin, chartTimePeriod]);

    useEffect(() => {
        getAllCoinsData();
        getSelectedCoinData(selectedCoin.id);
    }, [currency]);

    return (
        <Context.Provider
            value={{
                test,
                getAllCoinsData,
                allCoins,
                setCurrency,
                getGainers,
                getLoosers,
                selectedCoin,
                getSelectedCoinData,
                currency,
                chartData,
                setChartTimePeriod,
                chartTimePeriod,
                searchCoin,
                renderData
            }}>
            {props.children}
        </Context.Provider>
    )
}