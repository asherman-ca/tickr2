import { Outlet, Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
	const { user } = UserAuth();

	if (user == null) {
		return <Navigate to={'/'} />;
	} else {
		return <Outlet />;
	}
};

export default ProtectedRoute;
