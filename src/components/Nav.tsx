import { Link } from 'react-router-dom';

import NavMenu from './NavMenu';
import { CoinsData } from '../context/CoinContext';
import styles from './Nav.module.css';
const { nav, col, brand } = styles;

const Nav = () => {
	const { coins, loading } = CoinsData();

	return (
		<div className={`${nav}`}>
			<Link to='/' className={`${col} ${brand}`}>
				<i className='fa-solid fa-coins' />
				Tickr
			</Link>
			<div className={`${col}`}>Search Field</div>
			<div className={`${col}`}>
				<NavMenu />
			</div>
		</div>
	);
};

export default Nav;
