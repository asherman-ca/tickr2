export const moneyParse = (num: number) => {
	if (num > 1000000000) {
		return (
			(num / 1000000000).toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 2,
			}) + 'B'
		);
	} else if (num > 1000000) {
		return (
			(num / 1000000).toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
				minimumFractionDigits: 2,
			}) + 'M'
		);
	}
	return num.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	});
};

export const numberParse = (num: number) => {
	return num.toLocaleString();
};
