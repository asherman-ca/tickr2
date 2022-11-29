import { Outlet } from 'react-router-dom';

const Account = () => {
	{
		console.log('hits protected route');
	}
	// protected logic here
	return <Outlet />;
};

export default Account;
