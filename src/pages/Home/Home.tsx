import { useState } from 'react';
import { numberParse, moneyParse } from '../../utils/numbers';
import { CoinsData } from '../../context/CoinContext';
import CoinList from './components/CoinList';
import styles from './Home.module.css';
import Trending from './components/Trending';
import Spinner from '../../components/Spinner';
const { body, header, homeContainer, subHeader } = styles;

const home = () => {
	const { coins, loading, global } = CoinsData();

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
				<CoinList coins={coins} loading={loading} />
			</div>
		</div>
	);
};

export default home;
