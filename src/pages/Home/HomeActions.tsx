import { useMemo } from 'react';
import { coin, sortParamType } from '../../utils/types';

export const displayCoinsMemo = (
	coins: coin[],
	loading: boolean,
	sortParam: { type: string; direction: string },
	userLikes: any
) => {
	return useMemo(() => {
		const { type, direction } = sortParam;
		coins.map((coin) => {
			if (userLikes.includes(coin.id)) {
				coin.liked = true;
				return coin;
			} else {
				return coin;
			}
		});

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
		} else if (type === '7d') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return (
						b.market_data.price_change_percentage_7d -
						a.market_data.price_change_percentage_7d
					);
				});
			} else {
				return coins.sort((a, b) => {
					return (
						a.market_data.price_change_percentage_7d -
						b.market_data.price_change_percentage_7d
					);
				});
			}
		} else if (type === '24hr') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return (
						b.market_data.price_change_percentage_24h -
						a.market_data.price_change_percentage_24h
					);
				});
			} else {
				return coins.sort((a, b) => {
					return (
						a.market_data.price_change_percentage_24h -
						b.market_data.price_change_percentage_24h
					);
				});
			}
		} else if (type === '1hr') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return (
						b.market_data.price_change_percentage_1h_in_currency.usd -
						a.market_data.price_change_percentage_1h_in_currency.usd
					);
				});
			} else {
				return coins.sort((a, b) => {
					return (
						a.market_data.price_change_percentage_1h_in_currency.usd -
						b.market_data.price_change_percentage_1h_in_currency.usd
					);
				});
			}
		} else if (type === 'volume') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return (
						b.market_data.total_volume.usd - a.market_data.total_volume.usd
					);
				});
			} else {
				return coins.sort((a, b) => {
					return (
						a.market_data.total_volume.usd - b.market_data.total_volume.usd
					);
				});
			}
		}
	}, [loading, sortParam, userLikes]);
};

export const handleSort = (
	type: string,
	sortParam: sortParamType,
	setSortParam: (argument: sortParamType) => void
) => {
	if (type === 'mcap') {
		if (sortParam.direction === 'desc' && sortParam.type === 'mcap') {
			setSortParam({ type: 'mcap', direction: 'asc' });
		} else {
			setSortParam({ type: 'mcap', direction: 'desc' });
		}
	} else if (type === '7d') {
		if (sortParam.direction === 'desc' && sortParam.type === '7d') {
			setSortParam({ type: '7d', direction: 'asc' });
		} else {
			setSortParam({ type: '7d', direction: 'desc' });
		}
	} else if (type === '24hr') {
		if (sortParam.direction === 'desc' && sortParam.type === '24hr') {
			setSortParam({ type: '24hr', direction: 'asc' });
		} else {
			setSortParam({ type: '24hr', direction: 'desc' });
		}
	} else if (type === '1hr') {
		if (sortParam.direction === 'desc' && sortParam.type === '1hr') {
			setSortParam({ type: '1hr', direction: 'asc' });
		} else {
			setSortParam({ type: '1hr', direction: 'desc' });
		}
	} else if (type === 'volume') {
		if (sortParam.direction === 'desc' && sortParam.type === 'volume') {
			setSortParam({ type: 'volume', direction: 'asc' });
		} else {
			setSortParam({ type: 'volume', direction: 'desc' });
		}
	}
};
