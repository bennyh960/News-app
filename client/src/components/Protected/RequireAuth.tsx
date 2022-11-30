import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = ({ isUser }: { isUser: boolean }) => {
  return isUser ? <Outlet /> : <Navigate to={"/account"} />;
};

export default RequireAuth;
