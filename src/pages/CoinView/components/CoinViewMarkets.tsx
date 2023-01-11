import React from 'react';
import CoinViewTickerItem from './CoinViewTickerItem';
import styles from '../CoinView.module.css';
const { tickers, marketsHeader, marketsTable } = styles;

const CoinViewMarkets = ({ markets, title }: any) => {
	console.log('markets', markets);
	return (
		<div className={`${tickers}`}>
			<div>{`${title} Markets`}</div>
			<div className={`${marketsTable}`}>
				<div className={`${marketsHeader}`}>
					<div>
						<div>#</div>
						<div>Market</div>
					</div>
					<div>Pair</div>
					<div>Price</div>
					<div>Volume</div>
				</div>
				{markets.map((market: any, index: number) => {
					return <CoinViewTickerItem market={market} position={index + 1} />;
				})}
			</div>
		</div>
	);
};

export default CoinViewMarkets;
