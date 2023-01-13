import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import {
	query,
	where,
	collection,
	getDocs,
	orderBy,
	doc,
	getDoc,
} from 'firebase/firestore';

import { db } from '../../firebase.config';
import Spinner from '../../components/Spinner';
// import { onSelect, onChange } from './ExchangeActions';
import ExchangeForm from './components/ExchangeForm';
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

import { UserAuth } from '../../context/AuthContext';
import { calcPNL } from '../../utils/account';

const Exchange = () => {
	// const auth = getAuth() as any;
	const { user } = UserAuth();
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState();
	const [orders, setOrders] = useState();
	const [formData, setFormData] = useState({
		coin: '',
		price: 0,
		spent: 0,
		userRef: user.uid,
	});
	const [pnl, setPnl] = useState();
	const [currentUser, setUser] = useState();

	useEffect(() => {
		if (user.uid) {
			const fetchTask = async () => {
				const ordersRef = collection(db, 'orders');
				console.log('authUID', user.uid);
				const q = query(
					ordersRef,
					where('userRef', '==', user.uid),
					orderBy('timestamp', 'desc')
				);

				const snap = await getDocs(q);

				let orders = [] as any;

				snap.forEach((doc) => {
					return orders.push({ data: doc.data(), id: doc.id });
				});
				setOrders(orders);

				// task 2

				const ref = await fetch(
					`https://api.coingecko.com/api/v3/coins?per_page=30`
				);
				if (!ref.ok) {
					setLoading(true);
					throw new Error('Thrown Error Thrown');
				}
				const response = await ref.json();
				setCoins(response);
				console.log('response', response);

				setFormData((prev) => ({
					...prev,
					coin: response[0].name,
					price: response[0].market_data.current_price.usd,
					coinId: response[0].id,
					image: response[0].image.small,
					imageLarge: response[0].image.large,
				}));

				// task 3

				setPnl(calcPNL(orders, response) as any);

				// task 4

				const usersRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(usersRef);
				setUser(docSnap.data() as any);
			};

			const fetchAllTask = async () => {
				await fetchTask();
				setLoading(false);
			};

			fetchAllTask();
		}
	}, [user.uid]);

	if (loading) {
		return (
			<div className='container'>
				<Spinner />
			</div>
		);
	}

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
						<div>
							<div>1</div>
							<div>2</div>
						</div>
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
						<div>
							<div>1</div>
							<div>2</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`${exchangeForms}`}>
				<ExchangeForm
					coins={coins}
					orders={orders}
					setOrders={setOrders}
					setPnl={setPnl}
					user={currentUser}
					userId={user.uid}
					setUser={setUser}
				/>
			</div>
		</div>
	);
};

export default Exchange;
