import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import styles from './Exchanges.module.css';
const { exchangesContainer, table, tableHeader } = styles;
import ExchangeItem from './components/exchangeItem';

const Exchanges = () => {
	const [exchanges, setExchanges] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/exchanges?per_page=40`
			);
			if (!ref.ok) {
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();

			setExchanges(response);

			setLoading(false);
		};
		apiFetch();
	}, []);

	// useEffect(() => {
	// 	const apiFetch = async () => {
	// 		const ref = await fetch(
	// 			`https://api.coingecko.com/api/v3/exchanges?per_page=20`
	// 		);
	// 		if (!ref.ok) {
	// 			throw new Error('Thrown Error Thrown');
	// 		}
	// 		const response = await ref.json();

	// 		const exchangesTemp = (await Promise.all(
	// 			response.map(async (exchange: any) => {
	// 				const ref = await fetch(
	// 					`https://api.coingecko.com/api/v3/exchanges/${exchange.id}`
	// 				);
	// 				if (!ref.ok) {
	// 					throw new Error('Exchange fetch failed');
	// 				}
	// 				return await ref.json();
	// 			})
	// 		)) as any;
	// 		setExchanges(exchangesTemp);
	// 		setLoading(false);
	// 	};
	// 	apiFetch();
	// }, []);

	if (loading) {
		return (
			<div className={`container ${exchangesContainer}`}>
				<Spinner />
			</div>
		);
	}

	return (
		<div className={`container ${exchangesContainer}`}>
			<header>
				<div>Top Crytpocurrency Spot Exchanges</div>
				<div>
					Tickr ranks and scores exchanges based on traffic, liquidity, trading
					volumes, and confidence in the legitimacy of trading volumes reported.
				</div>
			</header>
			<div className={`${table}`}>
				<div className={`${tableHeader}`}>
					<div>
						<div>#</div>
						<div>Exchange</div>
					</div>
					<div>Score</div>
					<div>BTC Trading Volume (24h)</div>
					<div>Country</div>
					<div>Year Established</div>
				</div>
				{exchanges.map((exchange) => {
					return <ExchangeItem exchange={exchange} />;
				})}
			</div>
		</div>
	);
};

export default Exchanges;
