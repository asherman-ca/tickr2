import React from 'react';
import styles from '../Exchange.module.css';
const { orderHistoryTable, orderItem } = styles;
import { order } from '../../../utils/types';

import { numberParse, moneyParse } from '../../../utils/numbers';

type orderTableProps = {
	orders: order[] | undefined;
};

const OrderTable = ({ orders }: orderTableProps) => {
	return (
		<div className={`${orderHistoryTable}`}>
			<header>
				<div>Coin</div>
				<div>Value</div>
				<div>Type</div>
				<div>Quantity</div>
				<div>Price</div>
			</header>
			{orders &&
				orders.map((order: order) => {
					return (
						<div className={`${orderItem}`} key={order.id}>
							<div>
								<img src={order.data.image} alt='' />
								{order.data.coin}
							</div>
							<div>{moneyParse(order.data.spent)}</div>
							<div className={order.data.type === 'buy' ? 'pos' : 'neg'}>
								{order.data.type}
							</div>
							<div>{numberParse(order.data.spent / order.data.price)}</div>
							<div>{moneyParse(order.data.price)}</div>
						</div>
					);
				})}
		</div>
	);
};

export default OrderTable;
