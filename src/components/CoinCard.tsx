import { ReactElement } from "react";
import "../styles/Coincard.css";
import { getFormattedPrice } from "../context/utils";

export default function CoinCard(props: {
    img: string,
    name: string,
    price: string,
    change: number
}): ReactElement {

    return (
        <div className="coincard">
            <img src={props.img} alt="IMG" className="coincard-img" />
            <span title="Name" className="coincard-name">{props.name}</span>
            <span title={`Price ${props.price}`} className="coincard-price">{getFormattedPrice(props.price)}</span>
            <span
                title="24H change"
                className={`coincard-change ${props.change < 0 ? "red" : "green"}`}
            >
                {props.change < 0 ? props.change.toFixed(2) : "+" + props.change.toFixed(2)}%
            </span>
        </div>
    )
}