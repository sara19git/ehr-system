import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedUserType }) => {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedUserType && userType !== allowedUserType) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
