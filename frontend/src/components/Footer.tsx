import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { MyLogo } from "../assets/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <MyLogo width={60} height={62} />
          <p className={styles.tagline}>Fuel the flow. <br />Drink with purpose.</p>
        </div>

        {/* Quick Links */}
        <div className={styles.column}>
          <h4>Quick Links</h4>
          <ul className={styles.linksList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/cart">Shop</Link>
            </li>
            <li>
              <Link to="/login">Account</Link>
            </li>
          </ul>
        </div>

        {/* About */}
        <div className={styles.column}>
          <h4>About</h4>
          <ul className={styles.linksList}>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className={styles.column}>
          <h4>Follow Us</h4>
          <ul className={styles.linksList}>
            <li>
              <a href="#instagram" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="#twitter" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="#facebook" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="#tiktok" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.column}>
          <h4>Newsletter</h4>
          <p className={styles.description}>
            Get exclusive updates and offers.
          </p>
          <div className={styles.newsletter}>
            <input
              type="email"
              placeholder="Your email"
              className={styles.emailInput}
            />
            <button className={styles.subscribeBtn}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          &copy; {currentYear} Flow. All rights reserved.
        </p>
        <div className={styles.bottomLinks}>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
