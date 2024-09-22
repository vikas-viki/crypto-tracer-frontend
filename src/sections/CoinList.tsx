import { ReactNode, useContext } from "react";
import "../styles/Coinlist.css";
import { Context } from "../context/State";
import CoinCard from "../components/CoinCard";
import { Coin } from "../context/types";

export default function CoinList(): ReactNode {
    const context = useContext(Context);
    console.log(context);
    return (
        <div className="coinlist-main">
            <div className="coinlist-header">
                <button onClick={context.getAllCoinsData}>Ranking</button>
                <button onClick={context.getGainers}>Gainers</button>
                <button onClick={context.getLoosers}>Loosers</button>
            </div>
            <div className="coinlist-list">
                {
                    context?.renderData?.map((coin: Coin) => (
                        <CoinCard
                            key={coin.id}
                            img={coin.image}
                            price={context.currency == "INR" ? `₹${coin.current_price}` : `$${coin.current_price}`}
                            change={coin.price_change_percentage_24h}
                            name={coin.name}
                            id={coin.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}