import { coin } from '../../utils/types';

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
	setFormData((prev: any) => ({
		...prev,
		[e.target.id]: Number(e.target.value),
	}));
};

export { onSelect, onChange };
