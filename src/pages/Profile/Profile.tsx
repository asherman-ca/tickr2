import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import {
	query,
	where,
	collection,
	getDocs,
	orderBy,
	doc,
	getDoc,
} from 'firebase/firestore';

import { calcPNL } from '../../utils/account';
import { db } from '../../firebase.config';
import { UserAuth } from '../../context/AuthContext';
import { CoinsData } from '../../context/CoinContext';
import Assets from './components/Assets';
import WatchList from './components/WatchList';
import styles from './Profile.module.css';
const { profileContainer, tableTopMenu, active } = styles;

const Profile = () => {
	const { user } = UserAuth();
	const { coins, loading } = CoinsData();
	const [pageLoading, setPageLoading] = useState(true);
	const [pageType, setPageType] = useState('watchlist');
	const [pnl, setPnl] = useState();
	const [userLikes, setUserLikes] = useState();
	const [userData, setUserData] = useState();

	useEffect(() => {
		if (!loading && user) {
			const fetchTask = async () => {
				const orderQuery = getDocs(
					query(
						collection(db, 'orders'),
						where('userRef', '==', user.uid),
						orderBy('timestamp', 'desc')
					)
				);
				const userQuery = getDoc(doc(db, 'users', user.uid));
				const likesQuery = getDocs(
					query(collection(db, 'likes'), where('userRef', '==', user.uid))
				);
				const [ordersSnap, userSnap, likesSnap] = (await Promise.all([
					orderQuery,
					userQuery,
					likesQuery,
				])) as any;

				let orders = [] as any;
				ordersSnap.forEach((doc: any) => {
					return orders.push({ data: doc.data(), id: doc.id });
				});
				setPnl(calcPNL(orders, coins));
				setUserData(userSnap.data());

				let likesCopy = {} as any;
				console.log(ordersSnap);
				likesSnap.forEach(
					(el: any) => (likesCopy[el.data().coinId] = el.data())
				);
				coins.forEach((coin) => {
					if (likesCopy[coin.id]) {
						likesCopy[coin.id] = { ...coin };
					}
				});
				setUserLikes(likesCopy);
				setPageLoading(false);
			};

			fetchTask();
		}
	}, [loading, user]);

	if (loading) {
		return (
			<div className={`${profileContainer} container`}>
				<Spinner />
			</div>
		);
	}

	return (
		<div className={`${profileContainer} container`}>
			<h1>{pageType == 'watchlist' ? 'My Watchlist' : 'Assets'}</h1>
			<div>
				<div className={`${tableTopMenu}`}>
					<div>
						<button
							onClick={() => setPageType('watchlist')}
							className={`${pageType == 'watchlist' && active}`}
						>
							Watchlist
						</button>
						<button
							onClick={() => setPageType('assets')}
							className={`${pageType != 'watchlist' && active}`}
						>
							Assets
						</button>
					</div>
					<div>
						<Link to={pageType == 'watchlist' ? '/' : '/exchange'}>
							Add Coins
						</Link>
						<button>Logout</button>
					</div>
				</div>
				{pageType == 'watchlist' ? <WatchList coins={userLikes} /> : <Assets />}
			</div>
		</div>
	);
};

export default Profile;
