export const moneyParse = (num: number) => {
	const options = {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	};

	if (num > 1000000000) {
		return (num / 1000000000).toLocaleString('en-US', options) + 'B';
	} else if (num > 1000000) {
		return (num / 1000000).toLocaleString('en-US', options) + 'M';
	}
	return num.toLocaleString('en-US', options);
};

export const numberParse = (num: number) => {
	return num.toLocaleString();
};
