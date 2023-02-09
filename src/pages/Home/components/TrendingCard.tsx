import { Link } from 'react-router-dom';
import { numberParse } from '../../../utils/numbers';
import { coin } from '../../../utils/types';
import styles from '../Home.module.css';
const { trendingCoin, subHeader, trendingCoins, trendingCoinTitle } = styles;

type trendingCardProps = {
	coins: any[];
	title: string;
	trend: string;
};

type TrendColors = {
	daily: string;
	weekly: string;
	monthly: string;
};

const trendColors: TrendColors = {
	daily: 'fa-fire neg',
	weekly: 'fa-calendar-week blue',
	monthly: 'fa-calendar-days',
};

const TrendingCard = ({ coins, title, trend }: trendingCardProps) => {
	return (
		<div>
			<h3>
				<i
					className={`${trendColors[trend as keyof TrendColors]} fa-solid`}
				></i>
				{title}
			</h3>
			<div className={`${trendingCoins}`}>
				{coins.map((coin, idx) => {
					return (
						<Link
							to={`/coins/${coin.id}`}
							className={`${trendingCoin}`}
							key={`${trend} ${coin.name}`}
						>
							<div>
								<div className={`${subHeader}`}>{idx + 1}</div>
								<div className={`${trendingCoinTitle}`}>
									<img src={coin.image} alt='' />
									{coin.name}
								</div>
							</div>
							<div className={coin.changeVal > 0 ? 'pos' : 'neg'}>
								{numberParse(coin.changeVal)}%
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default TrendingCard;
