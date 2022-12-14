import { useState } from 'react';
import { numberParse, moneyParse } from '../../utils/numbers';
import { CoinsData } from '../../context/CoinContext';
import { coin } from '../../utils/types';
import { displayCoinsMemo, handleSort } from './HomeActions';
import CoinItem from './components/CoinItem';
import styles from './Home.module.css';
import Trending from './components/Trending';
import Spinner from '../../components/Spinner';
const {
	body,
	header,
	homeContainer,
	subHeader,
	coinListHeader,
	coinItems,
	coinHeaderTitle,
} = styles;

const rowsPerPageOptions = [10, 25, 50, 100];

const home = () => {
	const { coins, loading, global } = CoinsData();
	const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[1]);
	const [sortParam, setSortParam] = useState<{
		type: string;
		direction: string;
	}>({
		type: 'mcap',
		direction: 'desc',
	});
	const displayCoins = displayCoinsMemo(coins, loading, sortParam);
	// let [displayCoins, setDisplayCoins] = useState<coin[]>(coins);
	// useEffect(() => setDisplayCoins(coins), [loading]);

	// const handleSort = (type: string) => {
	// 	if (type === 'mcap') {
	// 		if (sortParam.direction === 'desc' && sortParam.type === 'mcap')
	// 			setSortParam({ type: 'mcap', direction: 'asc' });
	// 		else {
	// 			setSortParam({ type: 'mcap', direction: 'desc' });
	// 		}
	// 	}
	// };

	if (loading) {
		return (
			<div className={`${homeContainer} container`}>
				<Spinner />
			</div>
		);
	}

	return (
		<div className={`${homeContainer} container`}>
			<div className={`${header}`}>
				<h1>Today's Cryptocurrency Prices by Market Cap</h1>
				<div className={`${subHeader}`}>
					The global crypto market cap is{' '}
					{moneyParse(global.data.total_market_cap.usd)}, a&nbsp;
					<span
						className={
							global.data.market_cap_change_percentage_24h_usd < 0
								? 'neg'
								: 'pos'
						}
					>
						{numberParse(global.data.market_cap_change_percentage_24h_usd)}%
					</span>
					&nbsp;change over 24 hours.
				</div>
			</div>
			<Trending coins={[...coins]} />
			<div className={`${body}`}>
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
		</div>
	);
};

export default home;
