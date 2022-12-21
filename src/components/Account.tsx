import { Outlet } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
	const { user } = UserAuth();
	const navigate = useNavigate();

	if (!user) {
		navigate('/');
	} else {
		return <Outlet />;
	}
};

export default Account;
