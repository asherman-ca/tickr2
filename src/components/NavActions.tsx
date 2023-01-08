import { coin } from '../utils/types';

const filterSearchParam = (coins: coin[], searchParam: string) => {
	if (searchParam) {
		return coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchParam.toLowerCase())
		);
	} else {
		return [];
	}
};

export { filterSearchParam };
