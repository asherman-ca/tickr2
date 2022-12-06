import { useEffect, useState, useMemo } from 'react';

import { numberParse, moneyParse } from '../../utils/numbers';
import { coin } from '../../utils/types';
import { CoinsData } from '../../context/CoinContext';
import CoinItem from './components/CoinItem';
import styles from './Home.module.css';
const { trending, body, header, homeContainer, subHeader } = styles;

const rowsPerPageOptions = [10, 25, 50, 100];

const home = () => {
	const { coins, loading, global } = CoinsData();
	let [displayCoins, setDisplayCoins] = useState<coin[]>(coins);
	let [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[1]);

	useEffect(() => {
		setDisplayCoins(coins);
		console.log('global', global);
	}, [coins]);

	if (loading) {
		return (
			<div className={`${homeContainer} container`}>
				<div>loading</div>
			</div>
		);
	}

	return (
		<div className={`${homeContainer} container`}>
			<div className={`${header}`}>
				<h1>Today's Cryptocurrency Prices by Market Cap</h1>
				<div className={`${subHeader}`}>
					The global crypto market cap is{' '}
					{moneyParse(global.data.total_market_cap.usd / 1000000000)}B, a{' '}
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
			<div className={`${trending}`}>
				<div>Daily Trends</div>
				<div>7 Day Trends</div>
			</div>
			<div className={`${body}`}>
				{displayCoins.map((coin) => {
					return <CoinItem key={coin.id} coin={coin} />;
				})}
			</div>
		</div>
	);
};

export default home;
