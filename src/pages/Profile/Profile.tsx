import { useState } from 'react';
import { Link } from 'react-router-dom';
import Assets from './components/Assets';
import WatchList from './components/WatchList';

import styles from './Profile.module.css';
const { profileContainer, tableTopMenu, active } = styles;

const Profile = () => {
	const [pageType, setPageType] = useState('watchlist');

	return (
		<div className={`${profileContainer} container`}>
			<h1>{pageType == 'watchlist' ? 'My Watchlist' : 'Assets'}</h1>
			<div>
				<div className={`${tableTopMenu}`}>
					<div>
						<button
							onClick={() => setPageType('watchlist')}
							className={`${pageType == 'watchlist' && active}`}
						>
							Watchlist
						</button>
						<button
							onClick={() => setPageType('assets')}
							className={`${pageType != 'watchlist' && active}`}
						>
							Assets
						</button>
					</div>
					<div>
						<Link to={pageType == 'watchlist' ? '/' : '/exchange'}>
							Add Coins
						</Link>
						<button>Logout</button>
					</div>
				</div>
				{pageType == 'watchlist' ? <WatchList /> : <Assets />}
			</div>
		</div>
	);
};

export default Profile;
