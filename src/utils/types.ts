export type coin = {
	id: string;
	image: string;
	market_cap_rank: string;
	price_change_percentage_24h: number;
	price_change_percentage_7d_in_currency: number;
	price_change_percentage_30d_in_currency: number;
	price_change_percentage_1h_in_currency: number;
	current_price: number;
	market_cap: number;
	total_volume: number;
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
	description: {
		en: string;
	};
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

export type order = {
	id: string;
	data: {
		coin: string;
		coinId: string;
		image: string;
		imageLarge: string;
		price: number;
		spent: number;
		timestamp: string;
		type: string;
		userRef: string;
	};
};

export type newOrder = {
	coin: string;
	spent: number;
	price: number;
};
