import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ Element }) => {
    const { token } = useContext(AuthContext);

    return(
        <>
            {!token ? <Navigate to="/"/> : <Element />}
        </>
    );
}

export default ProtectedRoute;