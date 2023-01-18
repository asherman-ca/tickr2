import React, { useState } from 'react';

import { onSelect, onChange, onOrder } from '../ExchangeActions';
import styles from '../Exchange.module.css';
const {
	orderForm,
	typeSelector,
	selected,
	formDiv,
	inputContainer,
	buttonRow,
} = styles;
import { moneyParse, numParse2 } from '../../../utils/numbers';

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
					className={`${inputContainer}`}
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
				<div className={`${inputContainer}`}>
					<div>$</div>
					<input
						// onChange={(e) => onChange(e, setFormData)}
						id='price'
						placeholder={numParse2(formData.price) as string}
						// value={moneyParse(formData.price)}
						type='number'
						disabled={true}
						className='disabled-input'
					/>
				</div>
				<div className={`${inputContainer}`}>
					<div>$</div>
					<input
						onChange={(e) => onChange(e, setFormData)}
						id='spent'
						placeholder='Amount'
						type='text'
						value={formData.spent}
					/>
				</div>
				<div className={`${buttonRow}`}>
					<button
						className='blue-button'
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
						{formType == 'buy' ? `Buy` : `Sell`} {formData.coin}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ExchangeForm;
