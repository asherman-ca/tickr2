import { useState } from 'react';

import { onSelect, onChange, onOrder, onFaucet } from '../ExchangeActions';
import styles from '../Exchange.module.css';
const {
	orderForm,
	typeSelector,
	selected,
	formDiv,
	inputContainer,
	buttonRow,
	faucetForm,
	faucetButtonRow,
} = styles;
import { numParse2, moneyParse } from '../../../utils/numbers';
import NumberTickr from '../../../components/NumberTickr';

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
						id='price'
						placeholder={numParse2(formData.price) as string}
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
						className='blue-button exchange-form-button'
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
			<form className={`${formDiv} ${faucetForm}`}>
				<div>
					<div>USD balance</div>
					<NumberTickr newVal={user.testBalance} />
				</div>
				<div className={`${faucetButtonRow}`}>
					<button onClick={(e) => onFaucet(e, userId, user, setUser)}>
						Faucet
					</button>
				</div>
			</form>
		</div>
	);
};

export default ExchangeForm;
