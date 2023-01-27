export const moneyParse = (num: number) => {
	if (num) {
		const options = {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		};

		const smlOptions = {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 6,
		};

		if (num < 0.1) {
			return num.toLocaleString('en-US', smlOptions);
		} else if (num > 1000000000) {
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
	const f = Intl.NumberFormat('en-us', {
		minimumFractionDigits: 2,
	});
	const smlF = Intl.NumberFormat('en-us', {
		minimumFractionDigits: 6,
	});

	if (num < 0.1) {
		return smlF.format(num);
	} else {
		return f.format(num);
	}
};

export const numParse3 = (num: number) => {
	const f = Intl.NumberFormat('en-us', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	});

	return f.format(num);
};

export const moneyParse2 = (num: number) => {
	const f = Intl.NumberFormat('en-us', {
		currency: 'USD',
		style: 'currency',
		minimumFractionDigits: 2,
	});

	// use cntrl + space to reveal config option inside the brackets
	const f2 = Intl.NumberFormat(undefined, {
		notation: 'compact',
	});

	return f.format(num);
};

export const classNamer = (num: number) => {
	if (num > 0) {
		return 'pos';
	} else {
		return 'neg';
	}
};
