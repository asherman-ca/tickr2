import styles from '../Profile.module.css';
const { assetTable, assetItem } = styles;
import { moneyParse, numParse3, classNamer } from '../../../utils/numbers';

const Assets = ({ coins }: any) => {
	console.log('asset coins', coins);
	return (
		<div className={`${assetTable}`}>
			<div>
				<div>Name</div>
				<div>Value</div>
				<div>pnl</div>
				<div>u/pnl</div>
				<div>Coins</div>
				<div>Average Price</div>
			</div>
			{coins.map((coin: any) => {
				return (
					<div className={`${assetItem}`}>
						<div>
							<img src={coin.image} alt='' />
							{coin.coin}
						</div>
						<div>{moneyParse(coin.totalValue)}</div>
						<div className={`${classNamer(coin.rpnl)}`}>
							{moneyParse(coin.rpnl)}
						</div>
						<div className={`${classNamer(coin.pnl)}`}>
							{moneyParse(coin.pnl)}
						</div>
						<div>{numParse3(coin.totalCoins)}</div>
						<div>{moneyParse(coin.averagePrice)}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Assets;
