import React, { useState } from 'react';

import { onSelect, onChange, onOrder } from '../ExchangeActions';
import styles from '../Exchange.module.css';
const { orderForm, typeSelector, selected, formDiv } = styles;
import { moneyParse } from '../../../utils/numbers';

const ExchangeForm = ({
	coins,
	orders,
	setOrders,
	setPnl,
	user,
	userId,
	setUser,
	formData,
	setFormData,
}: any) => {
	const [formType, setFormType] = useState('buy');
	// const [formData, setFormData] = useState({
	// 	coin: '',
	// 	price: 0,
	// 	spent: 0,
	// 	userRef: userId,
	// });

	return (
		<div className={`${orderForm}`}>
			<div className={`${typeSelector}`}>
				<div
					onClick={() => setFormType('buy')}
					className={`${formType == 'buy' ? selected : ''}`}
				>
					Buy
				</div>
				<div
					onClick={() => setFormType('sell')}
					className={`${formType == 'sell' ? selected : ''}`}
				>
					Sell
				</div>
			</div>
			<form className={`${formDiv}`}>
				<select
					name='coin'
					id='coin'
					onChange={(e) => onSelect(e, setFormData, coins)}
				>
					{coins.map((doc: any) => (
						<option key={doc.id} value={doc.name}>
							{doc.name}
						</option>
					))}
				</select>
				<div className='input-container'>
					<div>$</div>
					<input
						// onChange={(e) => onChange(e, setFormData)}
						id='price'
						placeholder={moneyParse(formData.price) as string}
						// value={moneyParse(formData.price)}
						type='number'
						disabled={true}
						className='disabled-input'
					/>
				</div>
				<div className='input-container'>
					<div>$</div>
					<input
						onChange={(e) => onChange(e, setFormData)}
						id='spent'
						placeholder='Amount'
						type='number'
					/>
				</div>
				<div>
					<button
						onClick={(e) => {
							onOrder(
								e,
								formType,
								formData,
								orders,
								setOrders,
								setPnl,
								coins,
								userId,
								user,
								setUser
							);
						}}
					>
						{formType == 'buy' ? `buy` : `sell`}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ExchangeForm;
