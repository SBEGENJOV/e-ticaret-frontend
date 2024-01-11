import { useEffect, useState } from "react";
import Header from "../component/Layout/Header/Header";
import Footer from "../component/Layout/Footer/Footer";
import Proptypes from "prop-types";
import Search from "../component/Modals/Search/Search";
import Dialog from "../component/Modals/Dialog/Dialog";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isDialogShow, setIsDialogShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : localStorage.setItem("dialog", JSON.stringify(true));
    setTimeout(() => {
      setIsDialogShow(dialogStatus);
    }, 2000);
  }, []);

  return (
    <div className="main-layout">
      <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      <Header setIsSearchShow={setIsSearchShow} />
      {location.pathname === "/alfa" ? (
        <h1 style={{textAlign:"center", margin:"10%"}}>404 Not Found</h1>
      ) : (
        children
      )}
      <Footer />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: Proptypes.node,
};
