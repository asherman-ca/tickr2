import { CoinsData } from '../../context/CoinContext';

const home = () => {
	const { coins, loading } = CoinsData();
	console.log('loading', loading);
	console.log('coins', coins);

	if (loading) {
		return <h1>loading</h1>;
	}

	return <div>home</div>;
};

export default home;
