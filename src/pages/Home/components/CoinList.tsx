import { useState } from 'react';
import styles from '../Home.module.css';
import CoinItem from './CoinItem';
const { coinHeaderTitle, coinItems, coinListHeader } = styles;
import { displayCoinsMemo, handleSort } from '../HomeActions';
import { coin } from '../../../utils/types';

type CoinListProps = {
	coins: coin[];
	loading: boolean;
};

const rowsPerPageOptions = [10, 25, 50, 100];

const CoinList = ({ coins, loading }: CoinListProps) => {
	const [sortParam, setSortParam] = useState<{
		type: string;
		direction: string;
	}>({
		type: 'mcap',
		direction: 'desc',
	});
	const displayCoins = displayCoinsMemo(coins, loading, sortParam);
	const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[1]);

	return (
		<div>
			<div className={`${coinListHeader}`}>
				<div className={`${coinHeaderTitle}`}>
					<div>
						<i className='fa-regular fa-star'></i>#
					</div>
					<div>Name</div>
				</div>
				<div>Price</div>
				<button onClick={() => handleSort('1hr', sortParam, setSortParam)}>
					<i
						className={
							sortParam.type === '1hr'
								? sortParam.direction === 'desc'
									? 'fa-solid fa-circle-chevron-down'
									: 'fa-solid fa-circle-chevron-up'
								: 'hidden'
						}
					></i>
					1h %
				</button>
				<button onClick={() => handleSort('24hr', sortParam, setSortParam)}>
					<i
						className={
							sortParam.type === '24hr'
								? sortParam.direction === 'desc'
									? 'fa-solid fa-circle-chevron-down'
									: 'fa-solid fa-circle-chevron-up'
								: 'hidden'
						}
					></i>
					24h %
				</button>
				<button onClick={() => handleSort('7d', sortParam, setSortParam)}>
					<i
						className={
							sortParam.type === '7d'
								? sortParam.direction === 'desc'
									? 'fa-solid fa-circle-chevron-down'
									: 'fa-solid fa-circle-chevron-up'
								: 'hidden'
						}
					></i>
					7d %
				</button>
				<button onClick={() => handleSort('mcap', sortParam, setSortParam)}>
					<i
						className={
							sortParam.type === 'mcap'
								? sortParam.direction === 'desc'
									? 'fa-solid fa-circle-chevron-down'
									: 'fa-solid fa-circle-chevron-up'
								: 'hidden'
						}
					></i>
					Market Cap
				</button>
				<button onClick={() => handleSort('volume', sortParam, setSortParam)}>
					<i
						className={
							sortParam.type === 'volume'
								? sortParam.direction === 'desc'
									? 'fa-solid fa-circle-chevron-down'
									: 'fa-solid fa-circle-chevron-up'
								: 'hidden'
						}
					></i>
					Volume(24h)
				</button>
			</div>
			<div className={`${coinItems}`}>
				{displayCoins!.slice(0, 20).map((coin: coin) => {
					return <CoinItem key={coin.id} coin={coin} />;
				})}
			</div>
		</div>
	);
};

export default CoinList;
