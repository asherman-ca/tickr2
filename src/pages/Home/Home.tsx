import { CoinsData } from '../../context/CoinContext';

const home = () => {
	const { coins, loading } = CoinsData();
	console.log(coins);

	return <div>home</div>;
};

export default home;
