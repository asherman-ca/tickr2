import { coin } from '../../../utils/types';

type CoinItemProps = {
	coin: coin;
};

const CoinItem = ({ coin }: CoinItemProps) => {
	return <div>{coin.id}</div>;
};

export default CoinItem;
