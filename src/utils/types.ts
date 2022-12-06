export type coin = {
	id: string;
	image: object;
	market_data: object;
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
