import React from 'react';
import styles from './CoinView.module.css';
const {
	coinView,
	coinHeader,
	coinSubHeader,
	coinSurHeader,
	coinMarkets,
	coinDescription,
} = styles;

const CoinView = () => {
	return (
		<div className={`container ${coinView}`}>
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
			<div>markets</div>
			<div>descriptions</div>
		</div>
	);
};

export default CoinView;
