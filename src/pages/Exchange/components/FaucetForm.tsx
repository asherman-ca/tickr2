import React from 'react';
import styles from '../Exchange.module.css';
const { formDiv, buttonRow } = styles;

const FaucetForm = ({ user }: any) => {
	console.log('userFauc', user);
	return (
		<div className={`${formDiv}`}>
			<div>
				<div>USD balance</div>
				<div>{user.testBalance}</div>
			</div>
			<div className={`${buttonRow}`}>faucet</div>
		</div>
	);
};

export default FaucetForm;
