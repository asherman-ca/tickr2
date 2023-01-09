import React from 'react';
import styles from '../CoinView.module.css';
const { coinHeader, coinSurHeader, coinSubHeader } = styles;

import { coin } from '../../../utils/types';

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
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
				<div>6</div>
				<div>7</div>
			</div>
			<div className={`${coinSubHeader}`}>
				<div>likes</div>
				<div>socials</div>
			</div>
		</div>
	);
};

export default CoinViewHeader;
