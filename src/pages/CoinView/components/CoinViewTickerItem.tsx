import React from 'react';
import styles from '../CoinView.module.css';
const { tickerItem } = styles;
import { moneyParse } from '../../../utils/numbers';

const CoinViewTickerItem = ({ market, position }: any) => {
	return (
		<a
			href={`${market.trade_url}`}
			target='_blank'
			rel='noopener noreferrer'
			className={`${tickerItem}`}
		>
			<div>
				<div>{position}</div>
				<div>
					<img
						src={`../exchangeLogos/${market.market.identifier}.png`}
						alt=''
						onError={({ currentTarget }) => {
							currentTarget.onerror = null;
							currentTarget.src = '../logo192.png';
						}}
					/>
					{market.market.name}
				</div>
			</div>
			<div>
				{market.base} / {market.target}
				<img
					src={`../targetIcons/${market.target}.png`}
					alt=''
					onError={({ currentTarget }) => {
						currentTarget.onerror = null;
						currentTarget.src = '../logo192.png';
					}}
				/>
			</div>
			<div>{moneyParse(market.last)}</div>
			<div>{moneyParse(market.volume)}</div>
		</a>
	);
};

export default CoinViewTickerItem;
