import { useState, useEffect } from 'react';
import { numberParse, moneyParse } from '../../utils/numbers';
import { CoinsData } from '../../context/CoinContext';
import CoinList from './components/CoinList';
import styles from './Home.module.css';
import Trending from './components/Trending';
import Spinner from '../../components/Spinner';
const { body, header, homeContainer, subHeader } = styles;

import { UserAuth } from '../../context/AuthContext';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

const home = () => {
	const { coins, loading, global } = CoinsData();
	const { user } = UserAuth();
	const [userLikes, setUserLikes] = useState([]);
	const [likeLoading, setLikeLoading] = useState(true);

	useEffect(() => {
		const apiFetch = async () => {
			if (user) {
				const likesRef = collection(db, 'likes');
				const q = query(likesRef, where('userRef', '==', user.uid));
				const querySnap = await getDocs(q);
				let likes: any = [];
				querySnap.forEach((el) => likes.push(el.data().coinId));
				setUserLikes(likes);
			}
			setLikeLoading(false);
		};
		apiFetch();
	}, [user]);

	if (loading || user == false || likeLoading) {
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
				<CoinList coins={coins} loading={loading} userLikes={userLikes} />
			</div>
		</div>
	);
};

export default home;
