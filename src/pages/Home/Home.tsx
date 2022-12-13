import { useEffect, useState, useMemo } from 'react';

import { numberParse, moneyParse } from '../../utils/numbers';
import { coin } from '../../utils/types';
import { CoinsData } from '../../context/CoinContext';
import CoinItem from './components/CoinItem';
import styles from './Home.module.css';
import Trending from './components/Trending';
// import TrendingCard from './components/TrendingCard';
import Spinner from '../../components/Spinner';
const {
	trending,
	body,
	header,
	homeContainer,
	subHeader,
	coinListHeader,
	coinItems,
	coinHeaderTitle,
} = styles;

const rowsPerPageOptions = [10, 25, 50, 100];

const home = () => {
	const { coins, loading, global } = CoinsData();
	const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[1]);
	const [sortParam, setSortParam] = useState<{
		type: string;
		direction: string;
	}>({
		type: 'mcap',
		direction: 'desc',
	});
	const displayCoins = useMemo(() => {
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

	// let [displayCoins, setDisplayCoins] = useState<coin[]>(coins);
	// useEffect(() => setDisplayCoins(coins), [loading]);

	const handleSort = (type: string) => {
		if (type === 'mcap') {
			if (sortParam.direction === 'desc' && sortParam.type === 'mcap')
				setSortParam({ type: 'mcap', direction: 'asc' });
			else {
				setSortParam({ type: 'mcap', direction: 'desc' });
			}
		}
	};

	if (loading) {
		return (
			<div className={`${homeContainer} container`}>
				<Spinner />
			</div>
		);
	}

	return (
		<div className={`${homeContainer} container`}>
			<div className={`${header}`}>
				<h1>Today's Cryptocurrency Prices by Market Cap</h1>
				<div className={`${subHeader}`}>
					The global crypto market cap is{' '}
					{moneyParse(global.data.total_market_cap.usd)}, a&nbsp;
					<span
						className={
							global.data.market_cap_change_percentage_24h_usd < 0
								? 'neg'
								: 'pos'
						}
					>
						{numberParse(global.data.market_cap_change_percentage_24h_usd)}%
					</span>
					&nbsp;change over 24 hours.
				</div>
			</div>
			<Trending coins={[...coins]} />
			<div className={`${body}`}>
				<div className={`${coinListHeader}`}>
					<button className={`${coinHeaderTitle}`}>
						<div>
							<i className='fa-regular fa-star'></i>#
						</div>
						<div>Name</div>
					</button>
					<button>Price</button>
					<button>1h %</button>
					<button>24h %</button>
					<button>7d %</button>
					<button onClick={() => handleSort('mcap')}>
						<i
							className={
								sortParam.type === 'mcap'
									? sortParam.direction === 'desc'
										? 'fa-solid fa-circle-chevron-down'
										: 'fa-solid fa-circle-chevron-up'
									: 'hidden'
							}
						></i>
						Market Cap
					</button>
					<button>Volume(24h)</button>
				</div>
				<div className={`${coinItems}`}>
					{displayCoins!.map((coin) => {
						return <CoinItem key={coin.id} coin={coin} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default home;
