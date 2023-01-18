import { toast } from 'react-toastify';
import { coin } from '../../utils/types';
import {
	doc,
	deleteDoc,
	collection,
	addDoc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { calcPNL, invalidSell } from '../../utils/account';

const onSelect = (e: any, setFormData: any, coins: any) => {
	let price: number;
	let coinId: string;
	let image: string;
	let imageLarge: string;
	coins.forEach((el: coin) => {
		if (el.name === e.target.value) {
			price = el.market_data.current_price.usd;
			coinId = el.id;
			image = el.image.small;
			imageLarge = el.image.large;
		}
	});
	setFormData((prev: any) => ({
		...prev,
		price,
		coinId,
		image,
		imageLarge,
		coin: e.target.value,
	}));
};

const onChange = (e: any, setFormData: any) => {
	// setFormData((prev: any) => ({
	// 	...prev,
	// 	[e.target.id]: Number(e.target.value),
	// }));
	// console.log(formData)
	setFormData((prev: any) => ({
		...prev,
		[e.target.id]: e.target.value
			.replace(/,/g, '')
			.replace(/(\d)(?=(\d{3})+$)/g, '$1,'),
	}));
};

const onOrder = async (
	e,
	type,
	formData,
	orders,
	setOrders,
	setPnl,
	coins,
	userId,
	user,
	setUser
) => {
	e.preventDefault();
	console.log('hits');
	console.log(formData);
	// formData.spent = Number(formData.spent);

	if (formData.price === 0 || formData.spent === '') {
		toast.error('Price and amount required');
	} else {
		if (type === 'sell' && invalidSell(orders, formData)) {
			toast.error('Insufficient coins');
		} else if (type === 'buy' && user.testBalance < formData.spent) {
			toast.error('Insufficient funds');
		} else {
			// order tasks
			let formDataCopy = {
				...formData,
				type: type,
				timestamp: serverTimestamp(),
			};

			formDataCopy.spent = Number(formDataCopy.spent);

			const res = await addDoc(collection(db, 'orders'), formDataCopy);
			toast.success('Order created');

			await setOrders((prev) => [{ data: formDataCopy, id: res.id }, ...prev]);
			const ordersCopy = [...orders, { data: formDataCopy, id: res.id }];
			setPnl(calcPNL(ordersCopy, coins));

			// balance tasks
			if (type === 'buy') {
				const userRef = doc(db, 'users', userId);
				await updateDoc(userRef, {
					testBalance: user.testBalance - formData.spent,
				});
				setUser((prev) => {
					return {
						...prev,
						testBalance: prev.testBalance - formData.spent,
					};
				});
			} else {
				const userRef = doc(db, 'users', userId);
				await updateDoc(userRef, {
					testBalance: user.testBalance + formData.spent,
				});
				setUser((prev) => {
					return {
						...prev,
						testBalance: prev.testBalance + formData.spent,
					};
				});
			}
		}
	}
};

export { onSelect, onChange, onOrder };
