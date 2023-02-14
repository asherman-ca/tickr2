import { useState, useEffect } from 'react';
import {
	query,
	where,
	collection,
	getDocs,
	orderBy,
	doc,
	getDoc,
} from 'firebase/firestore';

import { CoinsData } from '../../context/CoinContext';
import { db } from '../../firebase.config';
import Spinner from '../../components/Spinner';
import ExchangeForm from './components/ExchangeForm';
import styles from './Exchange.module.css';
const {
	exchangeContainer,
	exchangeTables,
	exchangeForms,
	transactions,
	assets,
} = styles;
import { UserAuth } from '../../context/AuthContext';
import { calcPNL } from '../../utils/account';
import OrderTable from './components/OrderTable';
import AssetTable from './components/AssetTable';
import { order } from '../../utils/types';

const Exchange = () => {
	// const { coins, coinsLoading, global } = CoinsData();
	const { user } = UserAuth();
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState();
	const [orders, setOrders] = useState<order[]>();
	const [formData, setFormData] = useState({
		coin: '',
		price: 0,
		spent: '',
		userRef: user.uid,
	});
	const [pnl, setPnl] = useState();
	const [currentUser, setUser] = useState();

	useEffect(() => {
		if (user.uid) {
			const fetchTask = async () => {
				const ordersRef = collection(db, 'orders');
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
					`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d,30d`
				);
				if (!ref.ok) {
					setLoading(true);
					throw new Error('Thrown Error Thrown');
				}
				const response = await ref.json();
				setCoins(response);

				console.log('res', response);

				setFormData((prev) => ({
					...prev,
					coin: response[0].name,
					price: response[0].current_price,
					coinId: response[0].id,
					image: response[0].image,
					imageLarge: response[0].image,
					userRef: user.uid,
				}));

				// task 3

				setPnl(calcPNL(orders, response) as any);

				// task 4

				const usersRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(usersRef);
				setUser(docSnap.data() as any);
				setLoading(false);
			};

			// const fetchAllTask = async () => {
			// 	await fetchTask();
			// 	setLoading(false);
			// };

			// fetchAllTask();
			fetchTask();
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
			<div className={`${exchangeForms}`}>
				<ExchangeForm
					coins={coins}
					orders={orders}
					setOrders={setOrders}
					setPnl={setPnl}
					user={currentUser}
					userId={user.uid}
					setUser={setUser}
					formData={formData}
					setFormData={setFormData}
				/>
			</div>
			<div className={`${exchangeTables}`}>
				<div className={`${transactions}`}>
					<div>Order History</div>
					<OrderTable orders={orders} />
				</div>
				<div className={`${assets}`}>
					<div>Assets</div>
					<AssetTable pnl={pnl} />
				</div>
			</div>
		</div>
	);
};

export default Exchange;
