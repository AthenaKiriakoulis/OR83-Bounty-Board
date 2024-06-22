import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';

const PrivateRoute = ({ Component }) => {
    const { isLoggedIn } = useContext(AuthContext);


    return isLoggedIn ? <Component /> : <Navigate to="/" />;
};
export default PrivateRoute;