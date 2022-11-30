import { Link } from 'react-router-dom';

import styles from './Nav.module.css';
const { nav, col, brand } = styles;

const Nav = () => {
	return (
		<div className={`${nav}`}>
			<Link to='/' className={`${col} ${brand}`}>
				<i className='fa-solid fa-coins'></i>
				Tickr
			</Link>
			<div className={`${col}`}>Search Field</div>
			<div className={`${col}`}>Dropdown</div>
		</div>
	);
};

export default Nav;
