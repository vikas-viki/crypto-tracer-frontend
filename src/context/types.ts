export type Coin = {
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    circulating_supply: number;
    current_price: number;
    fully_diluted_valuation: number
    high_24h: number;
    id: string;
    image: string;
    last_updated: string;
    low_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    max_supply: number;
    name: string;
    price_change_24h: number;
    price_change_percentage_24h: number;
    roi: string;
    symbol: string;
    total_supply: number;
    total_volume: number;
};

export type DetailedCoin = {
    additional_notices: any,
    asset_platform_id: any,
    block_time_in_minutes: number,
    categories: string[],
    community_data: any,
    country_origin: string,
    description: { en: string },
    detail_platforms: any,
    developer_data: any,
    genesis_date: string,
    hashing_algorithm: string,
    id: string,
    image: { thumb: string, small: string, large: string },
    last_updated: string,
    links: { homepage: string[], whitepaper: string },
    localization: any,
    market_cap_rank: number,
    market_data: { market_cap: { usd: number, inr: number }, current_price: {usd: number, inr: number} },
    name: string,
    platforms: any,
    preview_listing: any,
    public_notice: any,
    sentiment_votes_down_percentage: any,
    sentiment_votes_up_percentage: any,
    status_updates: any,
    symbol: string,
    tickers: any,
    watchlist_portfolio_users: any,
    web_slug: string
};

export interface ContextType {
    allCoins: Coin[];
    selectedCoin: DetailedCoin,
    test: () => void;
    getGainers: () => void;
    getLoosers: () => void;
    getAllCoinsData: () => void;
    setCurrency: (currency: string) => void;
    getSelectedCoinData: (coin: string) => void;
    currency: string;
};
