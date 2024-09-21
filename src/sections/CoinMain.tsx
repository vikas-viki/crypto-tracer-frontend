import { ReactElement } from "react";
import CoinChart from "./CoinChart";
import CoinDetails from "./CoinDetails";

export default function CoinMain(): ReactElement {
    return (
        <div className="coin-main">
            <CoinChart />
            <CoinDetails />
        </div>
    )
}