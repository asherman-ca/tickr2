import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CoinContextProvider } from './context/CoinContext';
import { AuthContextProvider } from './context/AuthContext';
import CoinView from './pages/CoinView/CoinView';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Exchange from './pages/Exchange/Exchange';
import Exchanges from './pages/Exchanges/Exchanges';
import './App.css';
import Profile from './pages/Profile/Profile';

function App() {
	return (
		<>
			<CoinContextProvider>
				<AuthContextProvider>
					<Nav />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/signin' element={<SignIn />} />
						<Route path='/password-reset' element={<h1>password reset</h1>} />
						<Route path='/coins/:coinId' element={<CoinView />} />
						<Route path='/exchanges' element={<Exchanges />} />
						<Route element={<ProtectedRoute />}>
							<Route path='/profile' element={<Profile />} />
							<Route path='/exchange' element={<Exchange />} />
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
