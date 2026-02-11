import React from "react";
import Wave from "../assets/Wave";
import Wave_end from "../assets/Wave_end";
import Blob from "../assets/Blob";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <h1 className={styles.title}>4 0 4</h1>
            <h2 className={styles.subtitle}>This page drifted out of the flow.</h2>
            <p className={styles.text}>
             The page does not exist. <br /> Stay on focus and head back to the home page.
            </p>
            <Link to="/" className={styles.button}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;