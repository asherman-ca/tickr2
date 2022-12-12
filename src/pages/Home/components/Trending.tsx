import React from 'react';
import TrendingCard from './TrendingCard';
import styles from '../Home.module.css';
const { trending } = styles;
import { coin } from '../../../utils/types';

type TrendingPropsType = {
	coins: coin[];
};

const Trending = ({ coins }: TrendingPropsType) => {
	return (
		<div className={`${trending}`}>
			<TrendingCard
				trend='daily'
				title='Daily Trends'
				coins={coins
					.sort(
						(a, b) =>
							Math.abs(b.market_data.price_change_percentage_24h) -
							Math.abs(a.market_data.price_change_percentage_24h)
					)
					.slice(0, 5)}
			/>
			<TrendingCard
				trend='weekly'
				title='Weekly Trends'
				coins={coins
					.sort(
						(a, b) =>
							Math.abs(b.market_data.price_change_percentage_7d) -
							Math.abs(a.market_data.price_change_percentage_7d)
					)
					.slice(0, 5)}
			/>
			<TrendingCard
				trend='monthly'
				title='Monthly Trends'
				coins={coins
					.sort(
						(a, b) =>
							Math.abs(b.market_data.price_change_percentage_30d) -
							Math.abs(a.market_data.price_change_percentage_30d)
					)
					.slice(0, 5)}
			/>
		</div>
	);
};

export default Trending;
