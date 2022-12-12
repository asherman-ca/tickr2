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
} = styles;

const rowsPerPageOptions = [10, 25, 50, 100];

const home = () => {
	const { coins, loading, global } = CoinsData();
	let [displayCoins, setDisplayCoins] = useState<coin[]>(coins);
	let [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[1]);

	useEffect(() => {
		setDisplayCoins(coins);
	}, [coins]);

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
					{moneyParse(global.data.total_market_cap.usd)}, a{' '}
					<span
						className={
							global.data.market_cap_change_percentage_24h_usd < 0
								? 'neg'
								: 'pos'
						}
					>
						{numberParse(global.data.market_cap_change_percentage_24h_usd)}%
					</span>{' '}
					change over 24 hours.
				</div>
			</div>
			<Trending coins={coins} />
			<div className={`${body}`}>
				<div className={`${coinListHeader}`}>
					<div>
						<div>
							<i className='fa-regular fa-star'></i>#
						</div>
						<div>Name</div>
					</div>
					<div>Price</div>
					<div>1h %</div>
					<div>24h %</div>
					<div>7d %</div>
					<div>Market Cap</div>
					<div>Volume(24h)</div>
				</div>
				<div className={`${coinItems}`}>
					{displayCoins.map((coin) => {
						return <CoinItem key={coin.id} coin={coin} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default home;
