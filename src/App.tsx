import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CoinContextProvider } from './context/CoinContext';
import { AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import Account from './components/Account';
import Nav from './components/Nav';
import SignIn from './pages/Auth/SignIn';
import './App.css';

function App() {
	return (
		<>
			<CoinContextProvider>
				<AuthContextProvider>
					<Nav />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/signup' element={<h1>sign up</h1>} />
						<Route path='/signin' element={<SignIn />} />
						<Route path='/password-reset' element={<h1>password reset</h1>} />
						<Route path='/coins/:coinId' element={<h1>coin view</h1>} />
						<Route path='/exchanges' element={<h1>exchange list</h1>} />
						{/* TODO: protected */}
						<Route path='/account' element={<Account />}>
							<Route path='profile' element={<h1>profile</h1>} />
							<Route path='exchange' element={<h1>exchange</h1>} />
						</Route>
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				</AuthContextProvider>
			</CoinContextProvider>
			<ToastContainer />
		</>
	);
}

export default App;
