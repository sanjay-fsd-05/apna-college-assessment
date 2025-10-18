import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ children }) => {
  const token = Cookies.get("token");
  return token ? <Navigate to="/profile" /> : children;
};

export default PublicRoute;
