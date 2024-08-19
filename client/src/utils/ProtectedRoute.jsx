import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useStoreState } from "easy-peasy";

const ProtectedRoute = ({ children }) => {
  const user = useStoreState((state) => state.user);
  console.log(user);
  let isAuthenticated = !!user;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
