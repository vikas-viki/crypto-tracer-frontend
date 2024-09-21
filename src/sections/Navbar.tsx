import { ReactNode } from "react";
import "../styles/Navbar.css";

export default function Navbar(): ReactNode {
    return (
        <div className="navbar-main">
            <div className="navbar-left">
                <h1>Trace Crypto</h1>
            </div>
            <div className="navbar-right">
                Search
            </div>
        </div>
    )
}