import { isAdmin } from "../config/isAdmin.js";
import AdminLayout from "./AdminLayout.jsx";
import MainLayout from "./MainLayout.jsx";



const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.role : null;
  };
  const userRole = getUserRole();
export const Layout = userRole === "admin" ? AdminLayout : MainLayout;

