export type coin = {
	id: string;
	image: {};
	market_data: {
		price_change_percentage_24h: number;
		price_change_percentage_7d: number;
	};
	name: string;
	symbol: string;
};

export type global = {
	data: {
		total_market_cap: {
			usd: number;
		};
		market_cap_change_percentage_24h_usd: number;
	};
};
