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
import './App.css';

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
						<Route path='/exchanges' element={<h1>exchange list</h1>} />
						{/* TODO: protected */}
						<Route element={<ProtectedRoute />}>
							<Route path='/profile' element={<h1>profile</h1>} />
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
