import React from 'react';
import styles from '../CoinView.module.css';
const {
	coinHeader,
	coinSurHeader,
	coinSubHeader,
	surHeaderCol,
	surHeaderName,
} = styles;
import { coin } from '../../../utils/types';
import { moneyParse, numberParse } from '../../../utils/numbers';

type coinHeaderProps = {
	coin: coin;
	userLike: any;
	totalLikes: any;
	onLike: any;
};

const CoinViewHeader = ({
	coin,
	userLike,
	totalLikes,
	onLike,
}: coinHeaderProps) => {
	return (
		<div className={`${coinHeader}`}>
			<div className={`${coinSurHeader}`}>
				<div className={`${surHeaderName}`}>
					<img src={coin.image.small} alt='' />
					<div>
						<div>{coin.name}</div>
						<div>{coin.symbol.toUpperCase()}</div>
					</div>
				</div>
				<div className={`${surHeaderCol}`}>
					<div>price</div>
					<div>{moneyParse(coin.market_data.current_price.usd)}</div>
				</div>
				<div className={`${surHeaderCol}`}>
					<div>24hr</div>
					<div
						className={
							coin.market_data.price_change_percentage_24h > 0 ? 'pos' : 'neg'
						}
					>{`${numberParse(
						coin.market_data.price_change_percentage_24h
					)}%`}</div>
				</div>
				<div className={`${surHeaderCol}`}>
					<div>7d</div>
					<div
						className={
							coin.market_data.price_change_percentage_7d > 0 ? 'pos' : 'neg'
						}
					>{`${numberParse(
						coin.market_data.price_change_percentage_7d
					)}%`}</div>
				</div>
				<div className={`${surHeaderCol}`}>
					<div>ATH</div>
					<div
						className={
							coin.market_data.ath_change_percentage.usd > 0 ? 'pos' : 'neg'
						}
					>{`${numberParse(coin.market_data.ath_change_percentage.usd)}%`}</div>
				</div>
				<div className={`${surHeaderCol}`}>
					<div>Volume</div>
					<div>{`${moneyParse(coin.market_data.total_volume.usd)}`}</div>
				</div>
				<div className={`${surHeaderCol}`}>
					<div>Market Cap</div>
					<div>{moneyParse(coin.market_data.market_cap.usd)}</div>
				</div>
			</div>
			<div className={`${coinSubHeader}`}>
				<div>
					<div onClick={onLike}>Like it</div>
					<div>{totalLikes}</div>
				</div>
				<div>socials</div>
			</div>
		</div>
	);
};

export default CoinViewHeader;
