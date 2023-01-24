import React from 'react';
import styles from '../Exchanges.module.css';
const { exchangeItemDiv, exchangeItemTitle } = styles;
import { numberParse } from '../../../utils/numbers';

const ExchangeItem = ({ exchange }: any) => {
	console.log('exchange', exchange);
	return (
		<div className={`${exchangeItemDiv}`}>
			<div>
				<div>{exchange.trust_score_rank}</div>
				<div className={`${exchangeItemTitle}`}>
					<img src={exchange.image} alt='' />
					<span>{exchange.name}</span>
				</div>
			</div>
			<div>{exchange.trust_score}</div>
			<div>{numberParse(exchange.trade_volume_24h_btc)}</div>
			<div>{exchange.country}</div>
			<div>{exchange.year_established}</div>
		</div>
	);
};

export default ExchangeItem;
