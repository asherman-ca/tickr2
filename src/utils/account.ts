const invalidSell = (orders, newOrder) => {
	if (!orders.length) {
		return true;
	}

	let accounts = {};

	let buys = orders.filter((order) => order.data.type === 'buy');

	let sells = orders.filter((order) => order.data.type === 'sell');

	buys?.forEach((order) => {
		if (!accounts[order.data.coin]) {
			accounts[order.data.coin] = {
				coin: order.data.coin,
				spent: order.data.spent,
				total: order.data.spent / order.data.price,
			};
		} else {
			accounts[order.data.coin].spent += order.data.spent;
			accounts[order.data.coin].total += order.data.spent / order.data.price;
		}
	});

	sells?.forEach((order) => {
		accounts[order.data.coin].total -= order.data.spent / order.data.price;
	});

	if (accounts[newOrder.coin].total - newOrder.spent / newOrder.price < 0) {
		return true;
	}
	return false;
};

const calcPNL = (orders: any, coins: any) => {
	let accounts = {} as any;

	let buys = orders.filter((order: any) => order.data.type === 'buy');

	let sells = orders.filter((order: any) => order.data.type === 'sell');

	buys?.forEach((order: any) => {
		if (!accounts[order.data.coin]) {
			accounts[order.data.coin] = {
				coin: order.data.coin,
				spent: order.data.spent,
				total: order.data.spent / order.data.price,
				totalSold: 0,
				earn: 0,
				coinId: order.data.coinId,
				image: order.data.image,
				imageLarge: order.data.imageLarge,
			};
		} else {
			accounts[order.data.coin].spent += order.data.spent;
			accounts[order.data.coin].total += order.data.spent / order.data.price;
		}
	});

	Object.values(accounts).forEach((account: any) => {
		accounts[account.coin].averagePrice = account.spent / account.total;
	});

	sells?.forEach((order: any) => {
		accounts[order.data.coin].total -= order.data.spent / order.data.price;
		accounts[order.data.coin].earn += order.data.spent;
		accounts[order.data.coin].totalSold += order.data.spent / order.data.price;
	});

	let PNL = [] as any;

	Object.values(accounts).forEach((account: any) => {
		if (coins?.filter((coin: any) => coin.name === account.coin).length > 0) {
			const currentPrice = coins?.filter(
				(coin: any) => coin.name === account.coin
			)[0].market_data.current_price.usd;

			PNL.push({
				coin: account.coin,
				pnl:
					account.total *
					account.averagePrice *
					(currentPrice / account.averagePrice - 1),
				totalCoins: account.total,
				averagePrice: account.averagePrice,
				totalValue: currentPrice * account.total,
				rpnl: account.earn - account.totalSold * account.averagePrice,
				coinId: account.coinId,
				image: account.image,
				imageLarge: account.imageLarge,
			});
		}
	});

	PNL.sort((a: any, b: any) => b.totalValue - a.totalValue);

	return PNL;
};

export { calcPNL, invalidSell };
