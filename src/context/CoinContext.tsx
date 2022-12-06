import { createContext, useContext, useEffect, useState } from 'react';
import { coin } from '../utils/types';

interface AppContextInterface {
	coins: any[];
	global: {};
	loading: boolean;
}
const CoinContext = createContext<AppContextInterface | null>(null);

export const CoinContextProvider = ({ children }: any) => {
	let [coins, setCoins] = useState<coin[]>([]);
	let [global, setGlobal] = useState<{}>({});
	let [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const makeApiCalls = async () => {
			try {
				const coinsRef = await fetch(
					`https://api.coingecko.com/api/v3/coins?per_page=200`
				);
				const globalRef = await fetch(
					`https://api.coingecko.com/api/v3/global`
				);

				const responses = await Promise.all([
					coinsRef.json(),
					globalRef.json(),
				]);
				setCoins(responses[0]);
				setGlobal(responses[1]);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		};

		makeApiCalls();
	}, []);

	return (
		<CoinContext.Provider value={{ coins, loading, global }}>
			{children}
		</CoinContext.Provider>
	);
};

export const CoinsData = () => {
	return useContext(CoinContext) as AppContextInterface;
};
