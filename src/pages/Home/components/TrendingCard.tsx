import React from 'react';
import { coin } from '../../../utils/types';

type trendingCardProps = {
	coins: coin[];
	title: string;
};

const TrendingCard = ({ coins, title }: trendingCardProps) => {
	console.log('trend coins', coins);
	return (
		<div>
			<h3>
				<i
					className={`${
						title.includes('Daily') ? 'fa-fire' : 'fa-calendar-week'
					} fa-solid`}
				></i>
				{title}
			</h3>
			<div>
				{coins.map((coin) => {
					return <div>{coin.id}</div>;
				})}
			</div>
		</div>
	);
};

export default TrendingCard;
