import { ReactElement, useContext, useRef } from "react";
import "../styles/Coincard.css";
import { getFormattedPrice } from "../context/utils";
import { Context } from "../context/State";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";

export default function CoinCard(props: {
    img: string,
    name: string,
    price: string,
    change: number,
    id: string,
    index: number
}): ReactElement {
    const context = useContext(Context);
    const container = useRef<HTMLDivElement | null>(null);
    const price = useRef<HTMLSpanElement | null>(null);

    useGSAP(() => {
        if (props.index <= 10) {
            gsap.fromTo(container.current,
                { x: '100%', opacity: 0 },
                {
                    x: '0%',
                    opacity: 1,
                    duration: 0.9,
                    ease: "power2.inOut",
                    delay: (props.index * 0.07) + (-0.25),
                    onUpdate: () => {
                        if (container.current) container.current.style.overflow = 'hidden';
                    }
                }
            );
        }
    }, [context.renderData]);

    return (
        <div ref={container} className="coincard" onClick={() => { context.getSelectedCoinData(props.id.toLowerCase()) }}>
            <img src={props.img} alt="IMG" className="coincard-img" />
            <span title="Name" className="coincard-name">{props.name}</span>
            <span title={`Price ${props.price}`} className="coincard-price" ref={price}>
                {getFormattedPrice(props.price)}
            </span>
            <span
                title="24H change"
                className={`coincard-change ${props.change < 0 ? "red" : "green"}`}
            >
                {props.change < 0 ? props.change.toFixed(2) : "+" + props.change.toFixed(2)}%
            </span>
        </div>
    );
}
