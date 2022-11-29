import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useState } from 'react';
import reactLogo from './assets/react.svg';

import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<div>Nav</div>
			<Routes>
				<Route path='/' element={<h1>home</h1>} />
				<Route path='/coins/:coinId' element={<h1>coin view</h1>} />
				<Route path='/signup' element={<h1>sign up</h1>} />
				<Route path='/signin' element={<h1>sign in</h1>} />
				<Route path='/password-reset' element={<h1>password reset</h1>} />
				{/* TODO: protected */}
				<Route path='/account' element={<h1>account</h1>} />
				{/* TODO: protected */}
				<Route path='/exchange' element={<h1>exchange</h1>} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
			<ToastContainer />
		</>

		// <div className='App'>
		// 	<div>
		// 		<a href='https://vitejs.dev' target='_blank'>
		// 			<img src='/vite.svg' className='logo' alt='Vite logo' />
		// 		</a>
		// 		<a href='https://reactjs.org' target='_blank'>
		// 			<img src={reactLogo} className='logo react' alt='React logo' />
		// 		</a>
		// 	</div>
		// 	<h1>Vite + React</h1>
		// 	<div className='card'>
		// 		<button onClick={() => setCount((count) => count + 1)}>
		// 			count is {count}
		// 		</button>
		// 		<p>
		// 			Edit <code>src/App.tsx</code> and save to test HMR
		// 		</p>
		// 	</div>
		// 	<p className='read-the-docs'>
		// 		Click on the Vite and React logos to learn more
		// 	</p>
		// </div>
	);
}

export default App;
