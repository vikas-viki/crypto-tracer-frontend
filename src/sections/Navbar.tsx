import { ReactNode, useContext, useRef } from "react";
import "../styles/Navbar.css";
import { ContextType } from "../context/types";
import { Context } from "../context/State";
import { getChartTimeUI, getNextTime } from "../context/utils";
// import { useGSAP } from "@gsap/react";
// import gsap from 'gsap';

export default function Navbar(): ReactNode {
    const context: ContextType = useContext(Context);
    const daySetter = useRef<HTMLButtonElement | null>(null);
    const currencySetter = useRef<HTMLButtonElement | null>(null);
    const searchBar = useRef<HTMLDivElement | null>(null);

    /*
    gsap.registerPlugin(useGSAP);

    useGSAP(() => {
        gsap.fromTo([daySetter.current, currencySetter.current],
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                delay: 0.5,
                ease: "elastic.out(1, 0.5)"
            }
        );

        gsap.fromTo(searchBar.current,
            { width: '0' },
            { width: '250px', ease: "power2.inOut", duration: 0.6 }
        );
    });
    */

    return (
        <div className="navbar-main">
            <div className="navbar-left">
                <span>Trace Crypto</span>
            </div>
            <div className="navbar-right">
                <button className="navbar-chart-time"
                    ref={daySetter}
                    onClick={() => {
                        context.setChartTimePeriod(getNextTime(context.chartTimePeriod));
                    }}
                >
                    {getChartTimeUI(context.chartTimePeriod)}
                </button>
                <button className="navbar-currency"
                    ref={currencySetter}
                    onClick={() => {
                        context.setCurrency(context.currency == "INR" ? "USD" : "INR")
                    }}
                >
                    {context.currency}
                </button>
                <div className="navbar-search" ref={searchBar}>
                    <input type="text" placeholder="Search" onChange={(e) => {
                        context.searchCoin(e.target.value.toLowerCase());
                    }} />
                </div>
            </div>
        </div>
    )
}