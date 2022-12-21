import { Link } from 'react-router-dom';

import NavMenu from './NavMenu';
import { CoinsData } from '../context/CoinContext';
import styles from './Nav.module.css';
const { nav, col, brand, spins } = styles;

const Nav = () => {
	const { coins, loading } = CoinsData();

	return (
		<div className={`${nav}`}>
			<Link to='/' className={`${col} ${brand}`}>
				<div className={`${spins}`}>
					<i className={`fa-solid fa-coins`} />
					Tickr
				</div>
			</Link>
			<div className={`${col}`}>Search Field</div>
			<div className={`${col}`}>
				<NavMenu />
			</div>
		</div>
	);
};

export default Nav;
