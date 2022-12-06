import { useEffect, useState, useMemo } from 'react';

import { coin } from '../../utils/types';
import { CoinsData } from '../../context/CoinContext';
import CoinItem from './components/CoinItem';
import styles from './Home.module.css';
const { trending, body, header, homeContainer } = styles;

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
				<div>loading</div>
			</div>
		);
	}

	return (
		<div className={`${homeContainer} container`}>
			<div className={`${header}`}>
				Today's Cryptocurrency Prices by Market Cap
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
