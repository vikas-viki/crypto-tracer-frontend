import numeral from "numeral";
import { DetailedCoin } from "./types";

export const test = () => {
    console.log("test called!");
}

export const defaultSelectedCoin: DetailedCoin = {
    additional_notices: null,
    asset_platform_id: null,
    block_time_in_minutes: 0,
    categories: [""],
    community_data: null,
    country_origin: "",
    description: { en: "" },
    detail_platforms: null,
    developer_data: null,
    genesis_date: "",
    hashing_algorithm: "",
    id: "",
    image: { thumb: "", small: "", large: "" },
    last_updated: "",
    links: { homepage: [""], whitepaper: "" },
    localization: null,
    market_cap_rank: 0,
    market_data: { market_cap: { usd: 0, inr: 0 } },
    name: "",
    platforms: null,
    preview_listing: null,
    public_notice: null,
    sentiment_votes_down_percentage: null,
    sentiment_votes_up_percentage: null,
    status_updates: null,
    symbol: "",
    tickers: null,
    watchlist_portfolio_users: null,
    web_slug: ""
};

export const tryCatch: any = async (result: Promise<any>) => {
    try {
        var data = (await result).data;
    } catch (e) {
        console.log(e);
    }
    return data;
}

export const getFormattedPrice = (price: string) => {
    let priceAfterFormat = numeral(price).format("0a");
    var finalPrice: string;
    let currency: string = price.slice(0, 1);
    let amount: string = price.slice(1);
    let decimalsNeeded: boolean = priceAfterFormat.length > 3 ? false : true;

    if (decimalsNeeded) {
        finalPrice = currency + numeral(amount).format("0.00a");
    } else {
        finalPrice = currency + numeral(amount).format("0a");
    }
    return finalPrice;
}