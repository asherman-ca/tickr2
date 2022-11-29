import { createContext, useContext, useEffect, useState } from 'react';

interface AppContextInterface {
	coins: any[];
	loading: boolean;
}
const CoinContext = createContext<AppContextInterface | null>(null);

export const CoinContextProvider = ({ children }: any) => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins?per_page=200`
			);
			if (!ref.ok) {
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setCoins(response);

			setLoading(false);
		};
		apiFetch();
	}, []);

	return (
		<CoinContext.Provider value={{ coins, loading }}>
			{children}
		</CoinContext.Provider>
	);
};

export const CoinsData = () => {
	return useContext(CoinContext) as AppContextInterface;
};
