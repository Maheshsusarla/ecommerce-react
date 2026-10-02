import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Layout() {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;