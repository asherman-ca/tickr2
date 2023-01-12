import React from 'react';
import styles from './Exchange.module.css';
const {
	exchangeContainer,
	exchangeTables,
	exchangeForms,
	transactions,
	assets,
	orderForm,
} = styles;

const Exchange = () => {
	return (
		<div className={`${exchangeContainer}`}>
			<div className={`${exchangeTables}`}>
				<div className={`${transactions}`}>
					<div>Order History</div>
				</div>
				<div className={`${assets}`}>
					<div>Assets</div>
				</div>
			</div>
			<div className={`${exchangeForms}`}>
				<div className={`${orderForm}`}>
					<div>Order Form</div>
				</div>
			</div>
		</div>
	);
};

export default Exchange;
