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
							Math.abs(b.price_change_percentage_24h) -
							Math.abs(a.price_change_percentage_24h)
					)
					.map((coin) => {
						return {
							name: coin.name,
							changeVal: coin.price_change_percentage_24h,
							image: coin.image,
						};
					})
					.slice(0, 5)}
			/>
			<TrendingCard
				trend='weekly'
				title='Weekly Trends'
				coins={coins
					.sort(
						(a, b) =>
							Math.abs(b.price_change_percentage_7d_in_currency) -
							Math.abs(a.price_change_percentage_7d_in_currency)
					)
					.map((coin) => {
						return {
							name: coin.name,
							changeVal: coin.price_change_percentage_7d_in_currency,
							image: coin.image,
						};
					})
					.slice(0, 5)}
			/>
			<TrendingCard
				trend='monthly'
				title='Monthly Trends'
				coins={coins
					.sort(
						(a, b) =>
							Math.abs(b.price_change_percentage_30d_in_currency) -
							Math.abs(a.price_change_percentage_30d_in_currency)
					)
					.map((coin) => {
						return {
							name: coin.name,
							changeVal: coin.price_change_percentage_30d_in_currency,
							image: coin.image,
						};
					})
					.slice(0, 5)}
			/>
		</div>
	);
};

export default Trending;
