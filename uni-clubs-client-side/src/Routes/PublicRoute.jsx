import { Navigate, useLocation } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import Loader from "../Components/Loader";

const PublicRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();

    if (loading) return <Loader />;

    // If user is logged in → redirect
    if (user) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }

    return children;
};

export default PublicRoute;