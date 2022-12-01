import { useEffect, useState, useMemo } from 'react';

import { CoinsData } from '../../context/CoinContext';
import styles from './Home.module.css';
const { container } = styles;

const rowsPerPageOptions = [10, 25, 50, 100];

const home = () => {
	const { coins, loading } = CoinsData();
	const [displayCoins, setDisplayCoins] = useState<any[]>(coins);
	const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[1]);

	console.log('coins', coins);
	console.log('loading', loading);

	// useEffect(() => {
	// 	setDisplayCoins(coins);
	// }, [coins]);

	if (loading) {
		return <div>loading</div>;
	}

	return (
		<div className={`${container}`}>
			<div>top</div>
			<div>bottom</div>
		</div>
	);
};

export default home;
