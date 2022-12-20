export const moneyParse = (num: number) => {
	if (num) {
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
	} else {
		return 0;
	}
};

export const numberParse = (num: number) => {
	if (num) {
		return num.toLocaleString();
	} else {
		return 0;
	}
};

export const numParse2 = (num: number) => {
	const f = Intl.NumberFormat('en-us');
	return f.format(num);
};

export const moneyParse2 = (num: number) => {
	const f = Intl.NumberFormat('en-us', {
		currency: 'USD',
		style: 'currency',
	});

	// use cntrl + space to reveal config option inside the brackets
	const f2 = Intl.NumberFormat(undefined, {
		notation: 'compact',
	});
};
