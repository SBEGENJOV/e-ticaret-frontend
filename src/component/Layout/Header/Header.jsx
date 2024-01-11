import { CartContext } from "../../../context/CartProvider";
import { useContext, useEffect, useRef, useState } from "react";
import "./Header.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LogoContext } from "../../../context/LogoProvidor";
//import "./Header";

export default function Header({ setIsSearchShow }) {
  const { cartItems } = useContext(CartContext);
  const { logoVeri, logoRes } = useContext(LogoContext);
  const user = localStorage.getItem("user");
  const sidebarRef = useRef();
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        event.target.id !== "btn-menu"
      ) {
        sidebarRef.current.style.left = "-100%";
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOpenSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.left = "0";
    }
  };

  const handleCloseSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.left = "-100%";
    }
  };

  const handlePathnameChange = () => {
    setPathname(window.location.pathname);
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePathnameChange);

    return () => {
      window.removeEventListener("popstate", handlePathnameChange);
    };
  }, []);

  return (
    <header>
      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu" onClick={handleOpenSidebar}></i>
            </div>
            <div className="header-left">
              <Link to={"/"} className="logo">
                <img
                  src={logoRes ? logoVeri[0].img : <p>Hata</p>}
                  style={{ width: "80px", height: "auto" }}
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="header-center" id="sidebar" ref={sidebarRef}>
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <Link
                      to={"/"}
                      className={`menu-link ${pathname === "/" && "active"}`}
                      onClick={handleCloseSidebar}
                    >
                      Ana Sayfa
                    </Link>
                  </li>
                  <li className="menu-list-item megamenu-wrapper">
                    <Link
                      to={"/shop"}
                      className={`menu-link ${
                        pathname === "/shop" && "active"
                      }`}
                      onClick={handleCloseSidebar}
                    >
                      Ürünler
                    </Link>
                  </li>
                  <li className="menu-list-item">
                    <Link
                      to={"/blog"}
                      className={`menu-link ${
                        pathname === "/blog" && "active"
                      }`}
                      onClick={handleCloseSidebar}
                    >
                      Yazılar
                    </Link>
                  </li>
                  <li className="menu-list-item">
                    <Link
                      to={"/contact"}
                      className={`menu-link ${
                        pathname === "/contact" && "active"
                      }`}
                      onClick={handleCloseSidebar}
                    >
                      İletişim
                    </Link>
                  </li>
                </ul>
              </nav>
              <i className="bi-x-circle" id="close-sidebar" onClick={handleCloseSidebar}></i>
            </div>
            <div className="header-right">
              <div className="header-right-links">
                {user ? (                  
                  <Link to={"/user"} className="header-account">
                    <i className="bi bi-person"></i>
                  </Link>
                ) : (
                  <Link to={"/auth"} className="header-account">
                    <i className="bi bi-person"></i>
                  </Link>
                )}
                <button
                  className="search-button"
                  onClick={() => setIsSearchShow(true)}
                >
                  <i className="bi bi-search"></i>
                </button>
                <div className="header-cart">
                  <Link to={"/cart"} className="header-cart-link">
                    <i className="bi bi-bag"></i>
                    <span className="header-cart-count">
                      {cartItems.length}
                    </span>
                  </Link>
                </div>
                {user && (
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Çıkış yapmak istediginize emin misiniz ?"
                        )
                      ) {
                        localStorage.removeItem("user");
                        localStorage.removeItem("cartItems");
                        window.location.href = "/";
                      }
                    }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};
