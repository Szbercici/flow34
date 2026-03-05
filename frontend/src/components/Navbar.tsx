import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { MyLogo } from "../assets/Logo";
import ShoppingCartIcon from "../assets/ShoppingCart";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import { Menu, X } from "lucide-react";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { items } = useContext(CartContext)!;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} backdrop-blur-lg px-8`}>
      <Link to="/" className={styles.siteTitle} onClick={closeMenu}>
        <MyLogo width={75} height={77} />
      </Link>

      {/* Desktop Menu */}
      <ul className={styles.desktopMenu}>
        <li className={styles.desktopMenuItem}>
          <CustomLink to="/about" currentPath={location.pathname}>
            About
          </CustomLink>
        </li>
        {!isAuthenticated ? (
          <li className={styles.desktopMenuItem}>
            <CustomLink to="/login" currentPath={location.pathname}>
              Login
            </CustomLink>
          </li>
        ) : (
          <li className={styles.desktopMenuItem}>
            <CustomLink to="/account/me" currentPath={location.pathname}>
              Hi, {user?.username}
            </CustomLink>
          </li>
        )}
        <li className={styles.desktopMenuItem}>
          <CustomLink to="/products" currentPath={location.pathname}>
            Products
          </CustomLink>
        </li>
        <li className={styles.cartItem}>
          <CustomLink
            to="/cart"
            className={styles.cartItem}
            currentPath={location.pathname}
          >
            <ShoppingCartIcon size={35} color="var(--cart-icon-color)" />
            <div className={styles.cartBadge}>{items.length}</div>
          </CustomLink>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className={styles.mobileMenuButton}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Cart Icon */}
      <Link to="/cart" className={styles.mobileCart} onClick={closeMenu}>
        <ShoppingCartIcon size={35} color="var(--cart-icon-color)" />
        <div className={styles.cartBadge}>{items.length}</div>
      </Link>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <>
          <div className={styles.mobileMenuOverlay} onClick={closeMenu}></div>
          <div className={styles.mobileMenu}>
            <ul className={styles.mobileMenuList}>
              <li>
                <CustomLink
                  to="/about"
                  onClick={closeMenu}
                  currentPath={location.pathname}
                >
                  About
                </CustomLink>
              </li>
              {!isAuthenticated ? (
                <li className={styles.desktopMenuItem}>
                  <CustomLink
                    to="/login"
                    currentPath={location.pathname}
                    onClick={closeMenu}
                  >
                    Login
                  </CustomLink>
                </li>
              ) : (
                <li className={styles.desktopMenuItem}>
                  <CustomLink
                    to="/account/me"
                    currentPath={location.pathname}
                    onClick={closeMenu}
                  >
                    My account
                  </CustomLink>
                </li>
              )}
              <li className={styles.desktopMenuItem}>
            <CustomLink onClick={closeMenu} to="/products" currentPath={location.pathname}>
               Products
            </CustomLink>
            </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

function CustomLink({
  to,
  children,
  onClick,
  currentPath,
  className,
  ...props
}: React.ComponentProps<typeof Link> & {
  onClick?: () => void;
  currentPath: string;
}) {
  const path = currentPath;
  const activeClass = path === to ? styles.active : "";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={[className, activeClass].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Link>
  );
}

export default Navbar;
