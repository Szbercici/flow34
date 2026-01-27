import React from 'react'
import { logout, useAuth } from '../AuthContext';
import styles from './Account_page_menu.module.css';


const Account_page = () => {
  const { user, setUser } = useAuth();
  return (
    <>
    <div className="container">
        <div className={styles.menu}>
            <a href="/account/me">My account</a>
            <a href="/account/orders">My orders</a>
            <button onClick={() => logout(setUser)}>Logout</button>
        </div>
    </div>
    </>
  )
}

export default Account_page