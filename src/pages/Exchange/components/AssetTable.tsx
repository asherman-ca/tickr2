import React from 'react';
import styles from '../Exchange.module.css';
const { pnlTable, pnlItem } = styles;

import { moneyParse } from '../../../utils/numbers';

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
				return (
					<div className={`${pnlItem}`}>
						<div>{asset.coin}</div>
						<div>{moneyParse(asset.totalValue)}</div>
						<div
							className={`${asset.pnl > 0 && 'pos'} ${asset.pnl < 0 && 'neg'}`}
						>
							{moneyParse(asset.pnl)}
						</div>
						<div
							className={`${asset.rpnl > 0 && 'pos'} ${
								asset.rpnl < 0 && 'neg'
							}`}
						>
							{moneyParse(asset.rpnl)}
						</div>
						<div>{moneyParse(asset.averagePrice)}</div>
					</div>
				);
			})}
		</div>
	);
};

export default AssetTable;
