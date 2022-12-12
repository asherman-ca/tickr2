export type coin = {
	id: string;
	image: {
		thumb: string;
	};
	market_data: {
		price_change_percentage_24h: number;
		price_change_percentage_7d: number;
		price_change_percentage_30d: number;
		market_cap_rank: number;
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
