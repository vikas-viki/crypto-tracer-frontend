import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Coin, ContextType, DetailedCoin } from "./types";
import { defaultSelectedCoin, test, tryCatch } from "./utils";

export const Context = createContext<ContextType>({
    allCoins: [],
    selectedCoin: defaultSelectedCoin,
    test: () => { },
    getGainers: () => { },
    getLoosers: () => { },
    setCurrency: () => { },
    getAllCoinsData: () => { },
    getSelectedCoinData: () => { },
    currency: "INR"
});

export default function State(props: React.PropsWithChildren): JSX.Element {
    const BASE_URL = `https://api.coingecko.com/api/v3/coins`;
    const API_KEY = `?x_cg_demo_api_key=${import.meta.env.VITE_COIN_GEKO_APIKEY}`;

    const [allCoins, setAllCoins] = useState<Coin[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<DetailedCoin>(defaultSelectedCoin);
    const [currency, setCurrency] = useState("INR");

    const getAllCoinsData = async () => {
        var data = await tryCatch(axios.get(`${BASE_URL}/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=250&page=1&sparkline=false${API_KEY}`));
        setAllCoins(data);
    }

    const getGainers = () => {
        let tGD = [...allCoins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        setAllCoins(tGD);
    }

    const getLoosers = () => {
        let tLD = [...allCoins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        setAllCoins(tLD);
    }

    const getSelectedCoinData = async (coin: string) => {
        var data = await tryCatch(axios.get(`${BASE_URL}/${coin}${API_KEY}`));
        setSelectedCoin(data);
    }

    useEffect(() => {
        getAllCoinsData();
        getSelectedCoinData("bitcoin");
    }, []);

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
                currency
            }}>
            {props.children}
        </Context.Provider>
    )
}