import { useEffect, useState, useMemo } from 'react';

import { coin } from '../../utils/types';
import { CoinsData } from '../../context/CoinContext';
import CoinItem from './components/CoinItem';
import styles from './Home.module.css';
const { container, header, body } = styles;

const rowsPerPageOptions = [10, 25, 50, 100];

const home = () => {
	const { coins, loading } = CoinsData();
	const [displayCoins, setDisplayCoins] = useState<coin[]>(coins);
	const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[1]);

	// console.log('coins', coins);
	// console.log('loading', loading);

	useEffect(() => {
		setDisplayCoins(coins);
	}, [coins]);

	if (loading) {
		return <div>loading</div>;
	}

	return (
		<div className={`${container}`}>
			<div className={`${header}`}>
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
