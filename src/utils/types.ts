export type coin = {
	id: string;
	image: {
		thumb: string;
		small: string;
	};
	market_data: {
		price_change_percentage_24h: number;
		price_change_percentage_7d: number;
		price_change_percentage_30d: number;
		price_change_percentage_1h_in_currency: {
			usd: number;
		};
		market_cap_rank: number;
		total_volume: {
			usd: number;
		};
		current_price: {
			usd: number;
		};
		market_cap: {
			usd: number;
		};
		ath_change_percentage: {
			usd: number;
		};
	};
	name: string;
	symbol: string;
	links: {
		homepage: string;
		blockchain_site: string[];
		subreddit_url: string;
		repos_url: {
			github: string[];
		};
	};
	tickers: {}[];
	liked: boolean;
};

export type global = {
	data: {
		total_market_cap: {
			usd: number;
		};
		market_cap_change_percentage_24h_usd: number;
	};
};

export type sortParamType = {
	type: string;
	direction: string;
};

export type like = {
	id: string;
	data: {
		userRef: string;
		coinId: string;
	};
};
