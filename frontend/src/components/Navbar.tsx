import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { MyLogo } from '../assets/Logo';
import ShoppingCartIcon from "../assets/ShoppingCart";
import { useContext } from 'react';
import { Context } from '../Context'; 
import { Menu, X } from 'lucide-react';


const Navbar = () => {
  const { items } = useContext(Context)!;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <CustomLink to="/about">About</CustomLink>
        </li>
        <li className={styles.desktopMenuItem}>
          <CustomLink to="/login">Login</CustomLink>
        </li>
         <li className={styles.cartItem}>
          <CustomLink to="/cart">
            <ShoppingCartIcon size={35} color="black" />
            <div>{items.length}</div>
          </CustomLink>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button className={styles.mobileMenuButton} onClick={toggleMenu} aria-label="Menu">
        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <>
          <div className={styles.mobileMenuOverlay} onClick={closeMenu}></div>
          <div className={styles.mobileMenu}>
            <ul className={styles.mobileMenuList}>
              <li>
                <CustomLink to="/about" onClick={closeMenu}>About</CustomLink>
              </li>
              <li>
                <CustomLink to="/login" onClick={closeMenu}>Login</CustomLink>
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
  ...props
}: React.ComponentProps<typeof Link> & { onClick?: () => void }) {
  const path = window.location.pathname;

  return (
    <li className={path === to ? styles.active : ""}>
      <Link to={to} onClick={onClick} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
