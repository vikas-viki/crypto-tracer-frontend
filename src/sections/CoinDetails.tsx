import { ReactNode, useContext } from "react";
import "../styles/Coindetails.css"
import { Context } from "../context/State";
import { getFormattedPrice } from "../context/utils";
import parse from 'html-react-parser';

export default function CoinDetails(): ReactNode {

    const context = useContext(Context);

    const selectedCoin = context.selectedCoin;

    console.log({ selectedCoin: selectedCoin });

    return (
        <div className="coindetails-main">
            <div className="coindetails-sub">
                <div className="coindetails-stat">
                    <div className="coindetails-stat-sub">
                        <span>Rank: </span>
                        <span>{selectedCoin.market_cap_rank}</span>
                    </div>
                    <div className="coindetails-stat-sub">
                        <span>Price: </span>
                        <span title={(context.currency == "INR" ? "₹" : "$") + selectedCoin.market_data.current_price[context.currency == "INR" ? "inr" : "usd"]}>{getFormattedPrice((context.currency == "INR" ? "₹" : "$") + selectedCoin.market_data.current_price[context.currency == "INR" ? "inr" : "usd"].toString())}</span>
                    </div>
                    <div className="coindetails-stat-sub">
                        <span>Marker Cap: </span>
                        <span>{getFormattedPrice((context.currency == "INR" ? "₹" : "$") + selectedCoin.market_data.market_cap[context.currency == "INR" ? "inr" : "usd"].toString())}</span>
                    </div>
                </div>
                <div className="coindetails-text">
                    <img src={selectedCoin.image.large} alt="IMG" />
                    <div>
                        <span>{selectedCoin.name}</span><br />
                        <span>
                            {parse(selectedCoin.description.en.slice(0, 225))}
                            <a target="blank" href={selectedCoin.links.homepage[0]}>...</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}