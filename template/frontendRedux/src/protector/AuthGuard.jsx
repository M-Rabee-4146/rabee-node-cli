import { Navigate } from 'react-router';

const AuthGuard = ({ children, requireAdmin = false, requireUser = false }) => {
    const normalizedRole = (sessionStorage.getItem('role') || localStorage.getItem('role') || '').toLowerCase();


    if (requireAdmin && normalizedRole !== 'admin') {
        return <Navigate to="/" replace />;
    }
    const allowedRoles = ['admin', 'manager', 'cashier'];
    if (requireUser && !allowedRoles.includes(normalizedRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthGuard;
