import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { UserAuth } from '../context/AuthContext';
import styles from './Nav.module.css';
const { navLink } = styles;

const NavMenu = () => {
	const navigate = useNavigate();
	const { logout, user } = UserAuth();
	const [showDrop, setShowDrop] = useState<boolean>(false);

	const onLogout = async () => {
		logout();
		toast.info('Logged Out');
	};

	let authButton;
	if (user) {
		authButton = <div>logged in</div>;
	} else {
		authButton = <div>logged out</div>;
	}

	return <div>{authButton}</div>;
};

export default NavMenu;
