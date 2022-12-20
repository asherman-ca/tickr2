import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './Nav.module.css';
const { navLink } = styles;

const NavMenu = () => {
	const navigate = useNavigate();
	const [showDrop, setShowDrop] = useState<boolean>(false);

	return <div>NavMenu</div>;
};

export default NavMenu;
