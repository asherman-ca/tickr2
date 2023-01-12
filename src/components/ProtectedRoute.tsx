import { Outlet, Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
	const { user } = UserAuth();

	console.log('protected user', user);
	if (!user) {
		return <Navigate to={'/'} />;
	} else {
		return <Outlet />;
	}
};

export default ProtectedRoute;
