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
	e: any,
	type: any,
	formData: any,
	orders: any,
	setOrders: any,
	setPnl: any,
	coins: any,
	userId: any,
	user: any,
	setUser: any
) => {
	e.preventDefault();
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

			formDataCopy.spent = Number(formDataCopy.spent.replace(/,/g, ''));
			console.log('formdatacopy', formDataCopy);

			const res = await addDoc(collection(db, 'orders'), formDataCopy);
			toast.success('Order created');

			await setOrders((prev: any) => [
				{ data: formDataCopy, id: res.id },
				...prev,
			]);
			const ordersCopy = [...orders, { data: formDataCopy, id: res.id }];
			setPnl(calcPNL(ordersCopy, coins));

			// balance tasks
			if (type === 'buy') {
				const userRef = doc(db, 'users', userId);
				await updateDoc(userRef, {
					testBalance: user.testBalance - formDataCopy.spent,
				});
				setUser((prev: any) => {
					return {
						...prev,
						testBalance: prev.testBalance - formDataCopy.spent,
					};
				});
			} else {
				const userRef = doc(db, 'users', userId);
				await updateDoc(userRef, {
					testBalance: user.testBalance + formDataCopy.spent,
				});
				setUser((prev: any) => {
					return {
						...prev,
						testBalance: prev.testBalance + formDataCopy.spent,
					};
				});
			}
		}
	}
};

const onFaucet = async (e: any, uid: string, user: any, setUser: any) => {
	e.preventDefault();
	const currentSeconds = new Date().getTime() / 1000;
	if (new Date().getTime() / 1000 < user.lastFaucet?.seconds + 86400) {
		toast.error('1 faucet per day');
	} else {
		const userRef = doc(db, 'users', uid);
		await updateDoc(userRef, {
			testBalance: user.testBalance + 1000,
			lastFaucet: serverTimestamp(),
		});
		setUser((prev: any) => {
			return {
				...prev,
				testBalance: (prev.testBalance += 1000),
				lastFaucet: { seconds: currentSeconds },
			};
		});
	}
};

export { onSelect, onChange, onOrder, onFaucet };
