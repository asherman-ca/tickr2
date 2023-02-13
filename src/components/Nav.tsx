import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { filterSearchParam } from './NavActions';
import NavMenu from './NavMenu';
import { CoinsData } from '../context/CoinContext';
import styles from './Nav.module.css';
const { nav, col, brand, spins } = styles;

import { coin } from '../utils/types';

const Nav = () => {
	const navigate = useNavigate();
	const { coins, loading } = CoinsData();
	const [param, setParam] = useState('');
	const [searchFilter, setSearchFilter] = useState([]);

	const onSubmit = (e: any) => {
		e.preventDefault();
		navigate(`/coins/${param.toLowerCase()}`);
		setParam('');
		setSearchFilter([]);
	};

	const onChange = (e: any) => {
		e.preventDefault();
		setParam(e.target.value);
		setSearchFilter(filterSearchParam(coins, e.target.value) as any);
	};

	const onSuggestedClick = (suggestedId: string) => {
		navigate(`/coins/${suggestedId.toLowerCase()}`);
		setParam('');
		setSearchFilter([]);
	};

	return (
		<div className={`${nav}`}>
			<Link to='/' className={`${col} ${brand}`}>
				<div className={`${spins}`}>
					<i className={`fa-solid fa-coins`} />
					Tickr
				</div>
			</Link>
			{/* <div className={`${col}`}>Search Field</div> */}
			<form action='' onSubmit={onSubmit} className='nav-item search-div'>
				<i className='fa-solid fa-magnifying-glass'></i>
				<input
					type='text'
					placeholder='Search Coins'
					value={param}
					onChange={onChange}
				/>
				{searchFilter.length > 0 && (
					<div className='search-prefill'>
						{searchFilter.map((coin: coin) => (
							<div
								className='prefill-item'
								onClick={() => onSuggestedClick(coin.id)}
								key={coin.id}
							>
								<img src={coin.image} alt='' />
								<div>{coin.name}</div>
							</div>
						))}
					</div>
				)}
			</form>
			<div className={`${col}`}>
				<NavMenu />
			</div>
		</div>
	);
};

export default Nav;
