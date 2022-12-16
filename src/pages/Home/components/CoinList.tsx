import { useState } from 'react';
import styles from '../Home.module.css';
import CoinItem from './CoinItem';
import Pagination from '../../../components/Pagination';
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
	const [currentPage, setCurrentPage] = useState<number>(1);

	const updateRowsPerPage = (rowsNumber: number) => {
		setRowsPerPage(rowsNumber);
		setCurrentPage(1);
	};

	const nextPage = () => {
		setCurrentPage((prev) => prev + 1);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const prevPage = () => {
		setCurrentPage((prev) => prev - 1);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

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
				{displayCoins!
					.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
					.map((coin: coin) => {
						return <CoinItem key={coin.id} coin={coin} />;
					})}
			</div>
			<Pagination
				rowsPerPage={rowsPerPage}
				setRowsPerPage={updateRowsPerPage}
				rowsPerPageOptions={rowsPerPageOptions}
				totalCount={coins.length}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				nextPage={nextPage}
				prevPage={prevPage}
			/>
		</div>
	);
};

export default CoinList;
