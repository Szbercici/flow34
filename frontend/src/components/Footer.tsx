import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { MyLogo } from "../assets/Logo";
import { useAuth } from "../AuthContext";
import { toast } from "sonner";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Subscribed to newsletter!");
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <MyLogo width={60} height={62} />
          <p className={styles.tagline}>
            Fuel the flow. <br />
            Drink with purpose.
          </p>
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
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to={user ? "/account/me" : "/login"}>My Account</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.column}>
          <h4>Contact Us</h4>
          <ul className={styles.linksList}>
            <li>
              <a href="mailto:Flowproducts@gmail.com">Flowproducts@gmail.com</a>
            </li>
          </ul>
          <p className={styles.description} style={{ color: "grey" }}>
            Fast response
          </p>
        </div>

        {/* Newsletter */}
        <div className={styles.column}>
          <h4>Newsletter</h4>
          <p className={styles.description}>
            Get exclusive updates and offers.
          </p>
          <div className={styles.newsletter}>
            <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Your email"
                className={styles.emailInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className={styles.subscribeBtn}
                disabled={!email.trim()}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          &copy; {currentYear} Flow All rights reserved.
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
