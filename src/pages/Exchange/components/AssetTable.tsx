import React from 'react';
import styles from '../Exchange.module.css';
const { pnlTable, pnlItem } = styles;

import { numberParse, moneyParse } from '../../../utils/numbers';

const AssetTable = ({ pnl }: any) => {
	return (
		<div className={`${pnlTable}`}>
			<header>
				<div>Coin</div>
				<div>Value</div>
				<div>U/PNL</div>
				<div>R/PNL</div>
				<div>Avg Price</div>
			</header>
			{pnl.map((asset: any) => {
				return <div className={`${pnlItem}`}>pnl item</div>;
			})}
		</div>
	);
};

export default AssetTable;
