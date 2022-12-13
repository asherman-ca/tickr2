import { useMemo } from 'react';
import { coin } from '../../utils/types';

export const displayCoinsMemo = (
	coins: coin[],
	loading: boolean,
	sortParam: { type: string; direction: string }
) => {
	return useMemo(() => {
		if (sortParam.type === 'mcap') {
			if (sortParam.direction === 'desc') {
				return coins.sort((a, b) => {
					return a.market_data.market_cap_rank - b.market_data.market_cap_rank;
				});
			} else {
				return coins.sort((a, b) => {
					return b.market_data.market_cap_rank - a.market_data.market_cap_rank;
				});
			}
		}
	}, [loading, sortParam]);
};
