import { ReactNode } from "react";
import "../styles/Navbar.css";

export default function Navbar(): ReactNode {
    return (
        <div className="navbar-main">
            <div className="navbar-left">
                <span>Trace Crypto</span>
            </div>
            <div className="navbar-right">
                Search
            </div>
        </div>
    )
}