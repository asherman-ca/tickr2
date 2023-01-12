import React from 'react';
import styles from './Exchange.module.css';
const {
	exchangeContainer,
	exchangeTables,
	exchangeForms,
	transactions,
	assets,
	orderForm,
	orderHistoryTable,
	assetTable,
} = styles;

const Exchange = () => {
	return (
		<div className={`${exchangeContainer}`}>
			<div className={`${exchangeTables}`}>
				<div className={`${transactions}`}>
					<div>Order History</div>
					<div className={`${orderHistoryTable}`}>
						<header>
							<div>Coin</div>
							<div>Value</div>
							<div>Type</div>
							<div>Quantity</div>
							<div>Price</div>
						</header>
						<div>list</div>
					</div>
				</div>
				<div className={`${assets}`}>
					<div>Assets</div>
					<div className={`${orderHistoryTable}`}>
						<header>
							<div>Coin</div>
							<div>Value</div>
							<div>U/PNL</div>
							<div>R/PNL</div>
							<div>Avg Price</div>
						</header>
						<div>list</div>
					</div>
				</div>
			</div>
			<div className={`${exchangeForms}`}>
				<div className={`${orderForm}`}>
					<div>Order Form</div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default Exchange;
