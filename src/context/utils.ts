import numeral from "numeral";
import { ChartData, ContextType, Days, DetailedCoin } from "./types";
import { AxiosError } from "axios";

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
    id: "bitcoin",
    image: { thumb: "", small: "", large: "" },
    last_updated: "",
    links: { homepage: [""], whitepaper: "" },
    localization: null,
    market_cap_rank: 0,
    market_data: { market_cap: { usd: 0, inr: 0 }, current_price: { usd: 0, inr: 0 } },
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

export const defaultChartData: ChartData = {
    market_caps: [],
    prices: [],
    total_volumes: []
}

export const tryCatch: any = async (result: Promise<any>) => {
    try {
        var data = (await result).data;
    } catch (e: AxiosError | any) {
        console.error(e.message);
    }
    return data;
}

export const getFormattedPrice = (price: string): string => {
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

export const getCurrency = (context: ContextType): string => {
    if (context.currency == "INR") {
        return "₹";
    } else {
        return "$";
    }
}

export const getChartTime = (time: string): number => {
    switch (time) {
        case "DAY":
            return 1;
        case 'WEEK':
            return 7;
        case 'MONTH':
            return 30;
        default:
            return 365;
    }
}

export const getChartViewMinMax = (time: number, context: ContextType) => {
    switch (time) {
        case 1:
            return 0.5;
        case 7:
            return 1;
        case 30:
            if (context.selectedCoin.categories.includes("Stablecoins")) {
                return 1;
            }
            return 5;
        default:
            if (context.selectedCoin.categories.includes("Stablecoins")) {
                return 5;
            }
            return 25;
    }
}

export const getChartTimeUI = (time: number): string => {
    switch (time) {
        case 1:
            return '1D';
        case 7:
            return '1W';
        case 30:
            return '1M';
        default:
            return '1Y';
    }
}

export const getIntervalX = (context: ContextType): number => {
    if (context.chartTimePeriod == getChartTime("WEEK")) {
        return 25;
    } else if (context.chartTimePeriod == getChartTime("MONTH")) {
        return 100;
    } else if (context.chartTimePeriod == getChartTime("DAY")) {
        return 50;
    } else {
        return 30;
    }
}


export const getIntervalY = (context: ContextType): number => {
    if (context.selectedCoin.categories.includes("Stablecoins")) {
        if (context.chartTimePeriod == 1) {
            return 0.2;
        } else if (context.chartTimePeriod == 7) {
            return 0.4;
        } else if (context.chartTimePeriod == 30) {
            return 0.5;
        } else {
            return 1;
        }
    }
    var prices: number[] = context.chartData.prices.map((price: any, index, array) => price[1]);
    var value = {
        min: Math.min(...prices),
        max: Math.max(...prices),
    };
    value.min -= (value.min * getChartViewMinMax(context.chartTimePeriod, context) / 100);
    value.max += (value.max * getChartViewMinMax(context.chartTimePeriod, context) / 100);

    return Math.round((value.max - value.min) / 5);
}

export const getNextTime = (currentTime: number): Days => {
    const times = [1, 7, 30, 365];
    var index = times.indexOf(currentTime);
    return times[++index % 4] as Days;
}