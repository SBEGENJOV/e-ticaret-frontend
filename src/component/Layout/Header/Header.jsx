import { CartContext } from "../../../context/CartProvider";
import { useContext } from "react";
import "./Header.css";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { LogoContext } from "../../../context/LogoProvidor";

export default function Header({ setIsSearchShow }) {
  const { cartItems } = useContext(CartContext);
  const { logoVeri, logoRes } = useContext(LogoContext);
  const { pathname } = useLocation();
  const user = localStorage.getItem("user");
  const rol = JSON.parse(user).role;
  return (
    <header>
      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu"></i>
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
            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <Link
                      to={"/"}
                      className={`menu-link ${pathname === "/" && "active"}`}
                    >
                      Ana Sayfa
                      {/* <i className="bi bi-chevron-down"></i> */}
                    </Link>
                  </li>
                  <li className="menu-list-item megamenu-wrapper">
                    <Link
                      to={"/shop"}
                      className={`menu-link ${
                        pathname === "/shop" && "active"
                      }`}
                    >
                      Ürünler
                      {/* <i className="bi bi-chevron-down"></i> */}
                    </Link>
                  </li>
                  <li className="menu-list-item">
                    <Link
                      to={"/blog"}
                      className={`menu-link ${
                        pathname === "/blog" && "active"
                      }`}
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
                    >
                      İletişim
                    </Link>
                  </li>
                </ul>
              </nav>
              <i className="bi-x-circle" id="close-sidebar"></i>
            </div>
            <div className="header-right">
              <div className="header-right-links">
                {user ? (
                  rol === "admin" ? (
                    <Link to={"/admin"} className="header-account">
                      <i className="bi bi-person"></i>
                    </Link>
                  ) : (
                    <Link to={"/user"} className="header-account">
                      <i className="bi bi-person"></i>
                    </Link>
                  )
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
