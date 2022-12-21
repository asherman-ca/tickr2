import { useNavigate } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';
import styles from '../pages/Auth/Auth.module.css';
const { oauthLogo } = styles;

function OAuth() {
	const navigate = useNavigate();
	const { oAuth } = UserAuth();

	const onGoogleClick = async () => {
		oAuth(navigate);
	};

	return (
		<div onClick={onGoogleClick} className='oauth'>
			<img className={`${oauthLogo}`} src='../google.png' alt='' />
		</div>
	);
}

export default OAuth;
