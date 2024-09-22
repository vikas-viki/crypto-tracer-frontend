import { ReactNode, useContext } from "react";
import "../styles/Navbar.css";
import { ContextType } from "../context/types";
import { Context } from "../context/State";
import { getChartTimeUI, getNextTime } from "../context/utils";

export default function Navbar(): ReactNode {
    const context: ContextType = useContext(Context);

    return (
        <div className="navbar-main">
            <div className="navbar-left">
                <span>Trace Crypto</span>
            </div>
            <div className="navbar-right">
                <button className="navbar-chart-time"
                    onClick={() => {
                        context.setChartTimePeriod(getNextTime(context.chartTimePeriod));
                    }}
                >
                    {getChartTimeUI(context.chartTimePeriod)}
                </button>
                <button className="navbar-currency"
                    onClick={() => {
                        context.setCurrency(context.currency == "INR" ? "USD" : "INR")
                    }}
                >
                    {context.currency}
                </button>
                <div className="navbar-search">
                    <input type="text" placeholder="Search" onChange={(e) => {
                        context.searchCoin(e.target.value.toLowerCase());
                    }} />
                </div>
            </div>
        </div>
    )
}