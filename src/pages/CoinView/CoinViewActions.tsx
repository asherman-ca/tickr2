import { doc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../../firebase.config';
import { coin, like } from '../../utils/types';

export const onLike = async (
	user: any,
	setLikes: any,
	setUserLike: any,
	userLike: any,
	coin: coin
) => {
	if (!user) {
		toast.error('Must be logged in');
	} else {
		if (userLike) {
			await deleteDoc(doc(db, 'likes', userLike.id));
			setLikes((prev: like[]) => {
				return prev.filter((like: like) => like.id !== userLike.id);
			});
			setUserLike(null);
		} else {
			const newDoc = await addDoc(collection(db, 'likes'), {
				userRef: user.uid,
				coinId: coin.id,
			});
			setUserLike({
				id: newDoc.id,
				data: {
					userRef: user.uid,
					coinId: coin.id,
				},
			});
			setLikes((prev: like[]) => {
				return [
					...prev,
					{
						id: newDoc.id,
						data: {
							userRef: user.uid,
							coinId: coin.id,
						},
					},
				];
			});
		}
	}
};

export const tickerFilter = (coin: any) => {
	const compare = (a: any, b: any) => {
		if (a.last < b.last) {
			return -1;
		} else {
			return 1;
		}
	};

	const based = coin.tickers?.filter(
		(el: any) => el.target === 'USDT' || el.target === 'USD'
	);

	return based
		.filter((el: any) => coin.symbol.toUpperCase() === el.base)
		.slice(0, 24)
		.sort((a: any, b: any) => compare(a, b));
};
