import React from 'react';
import styles from '../Exchanges.module.css';
const { exchangeItemDiv, exchangeItemTitle, volumeDiv } = styles;
import { numParse3 } from '../../../utils/numbers';

const ExchangeItem = ({ exchange }: any) => {
	return (
		<a
			className={`${exchangeItemDiv}`}
			target='_blank'
			rel='noopener noreferrer'
			href={exchange.url}
		>
			<div>
				<div>{exchange.trust_score_rank}</div>
				<div className={`${exchangeItemTitle}`}>
					<img src={exchange.image} alt='' />
					<span>{exchange.name}</span>
				</div>
			</div>
			<div>{exchange.trust_score}</div>
			<div className={`${volumeDiv}`}>
				<i className='fa-brands fa-bitcoin'></i>
				{numParse3(exchange.trade_volume_24h_btc)}
			</div>
			<div>{exchange.country || 'Unlocated'}</div>
			<div>{exchange.year_established || 'Unknown'}</div>
		</a>
	);
};

export default ExchangeItem;
