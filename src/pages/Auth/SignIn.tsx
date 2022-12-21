import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import OAuth from '../../components/OAuth';
import { UserAuth } from '../../context/AuthContext';
import { SignInValidators as validators } from '../../utils/validation';
import styles from './Auth.module.css';
const {
	auth,
	header,
	authForm,
	inputContainer,
	invalid,
	formError,
	pwResetLink,
	buttonRow,
} = styles;

const SignIn = () => {
	const navigate = useNavigate();
	const { signIn } = UserAuth();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	const onSubmit = async (e) => {
		e.preventDefault();

		let errorFound = false;
		const errorsCopy = {};
		Object.keys(validators).forEach((key) => {
			if (!validators[key].action(formData[key])) {
				errorsCopy[key] = validators[key].message;
				errorFound = true;
			} else {
				errorsCopy[key] = '';
			}
		});
		setErrors((prev) => {
			return { ...prev, ...errorsCopy };
		});
		if (errorFound) {
			toast.error('Invalid form');
		} else {
			signIn(navigate, formData);
		}
	};

	const onChange = (e) => {
		setFormData((prev) => {
			return {
				...prev,
				[e.target.id]: e.target.value,
			};
		});
	};

	return (
		<div className='container'>
			<div className={`${auth}`}>
				<OAuth />
				<div className={`${header}`}>
					<div>Sign In</div>
					<div>to continue to Tickr</div>
				</div>

				<form onSubmit={onSubmit} className={`${authForm}`}>
					<div className={`${inputContainer}`}>
						<input
							onChange={onChange}
							id='email'
							type='email'
							placeholder='Email'
							className={errors.email ? `${invalid}` : ''}
						/>
						{errors.email && (
							<div className={`${formError}`}>{errors.email}</div>
						)}
					</div>

					<div className={`${inputContainer}`}>
						<input
							id='password'
							type='password'
							placeholder='Password'
							onChange={onChange}
							className={errors.password ? `${invalid}` : ''}
						/>
						{errors.password && (
							<div className={`${formError}`}>{errors.password}</div>
						)}
					</div>

					<Link to={'/password-reset'} className={`${pwResetLink}`}>
						Forgot password?
					</Link>

					<div className={`${buttonRow}`}>
						<Link to={'/signup'}>Create account</Link>
						<button onClick={onSubmit} className='blue-button'>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
