import { useMemo } from 'react';

export const displayCoins = ({ coins, loading, sortParam }) => {
	return useMemo(() => {
		if (sortParam.type === 'mcap') {
			if (sortParam.direction === 'desc') {
				console.log('hits', sortParam);
				return coins.sort((a, b) => {
					return a.market_data.market_cap_rank - b.market_data.market_cap_rank;
				});
			} else {
				console.log('hits', sortParam);
				return coins.sort((a, b) => {
					return b.market_data.market_cap_rank - a.market_data.market_cap_rank;
				});
			}
		}
	}, [loading, sortParam]);
};
