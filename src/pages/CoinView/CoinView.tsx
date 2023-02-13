import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { query, where, collection, getDocs } from 'firebase/firestore';

import { db } from '../../firebase.config';
import { UserAuth } from '../../context/AuthContext';
import styles from './CoinView.module.css';
import Spinner from '../../components/Spinner';
import CoinViewHeader from './components/CoinViewHeader';
import CoinViewMarkets from './components/CoinViewMarkets';
const { coinView, coinViewDesc } = styles;
import { onLike } from './CoinViewActions';
import { coinViewType } from '../../utils/types';

const CoinView = () => {
	const { user } = UserAuth();
	const params = useParams();

	const [coin, setCoin] = useState({} as coinViewType);
	const [loading, setLoading] = useState(true);
	const [userLike, setUserLike] = useState();
	const [likes, setLikes] = useState([]);

	useEffect(() => {
		const apiFetch = async () => {
			// get coin info
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins/${params.coinId}`
			);
			if (!ref.ok) {
				toast.error(`No results: "${params.coinId}"`);
				// clearInterval(interId);
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setCoin(response);

			// get likes
			const likesRef = collection(db, 'likes');
			const q = query(likesRef, where('coinId', '==', params.coinId));
			const querySnap = await getDocs(q);
			let likesCopy: any | null[] = [];
			querySnap.forEach((el) => likesCopy.push({ id: el.id, data: el.data() }));
			setLikes(likesCopy);

			if (user) {
				likesCopy.forEach((el: any) => {
					if (el.data.userRef === user.uid) {
						setUserLike(el);
					}
				});
			}

			setLoading(false);
		};
		// let interId = setInterval(apiFetch, 10000);
		apiFetch();

		// return () => {
		// 	clearInterval(interId);
		// };
	}, [params.coinId, user]);

	if (loading) {
		return (
			<div className={`container ${coinView}`}>
				<Spinner />
			</div>
		);
	}

	return (
		<div className={`container ${coinView}`}>
			<CoinViewHeader
				coin={coin}
				userLike={userLike}
				totalLikes={likes.length}
				onLike={() => onLike(user, setLikes, setUserLike, userLike, coin)}
			/>
			<CoinViewMarkets
				markets={coin.tickers
					.filter((market: any) => market.base === coin.symbol.toUpperCase())
					.sort((a: any, b: any) => b.volume - a.volume)
					.slice(0, 5)}
				title={coin.name}
			/>
			<div className={`${coinViewDesc}`}>
				<div>About {coin.name}</div>
				<div>{coin.description.en.replace(/<\/?a[^>]*>/g, '')}</div>
			</div>
		</div>
	);
};

export default CoinView;
