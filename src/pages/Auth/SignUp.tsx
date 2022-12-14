import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import OAuth from '../../components/OAuth';
import { UserAuth } from '../../context/AuthContext';
import { SignUpValidators } from '../../utils/validation';
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

const SignUp = () => {
	const navigate = useNavigate();
	const { createUser } = UserAuth();

	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
		balance: 0,
		testBalance: 100000,
		lastFaucet: {},
	} as any);
	const [errors, setErrors] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
	});
	const validators = SignUpValidators(formData) as any;

	const onSubmit = async (e: any) => {
		let errorFound = false;
		e.preventDefault();
		const errorsCopy = {} as any;
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
			createUser(navigate, formData);
		}
	};

	const onChange = (e: any) => {
		setFormData((prev: any) => {
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
					<div>Sign Up</div>
					<div>to continue to Tickr</div>
				</div>
				<form className={`${authForm}`}>
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
							id='name'
							type='text'
							placeholder='Name'
							onChange={onChange}
							className={errors.name ? `${invalid}` : ''}
						/>
						{errors.name && <div className={`${formError}`}>{errors.name}</div>}
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
					<div className={`${inputContainer}`}>
						<input
							id='confirmPassword'
							type='password'
							placeholder='Confirm Password'
							onChange={onChange}
							className={errors.confirmPassword ? `${invalid}` : ''}
						/>
						{errors.confirmPassword && (
							<div className={`${formError}`}>{errors.confirmPassword}</div>
						)}
					</div>
					<div className={`${buttonRow}`}>
						<Link to={'/signin'}>Already registered?</Link>
						<button onClick={onSubmit} className='blue-button'>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
