export const moneyParse = (num: number) => {
	return num.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	});
};

export const numberParse = (num: number) => {
	return num.toLocaleString();
};
