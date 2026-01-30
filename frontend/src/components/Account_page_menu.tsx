// Account_page.tsx - A SAJÁT KÓDOD ALAPJÁN
import React from 'react';
import { logout, useAuth } from '../AuthContext';
import styles from './Account_page_menu.module.css';

interface AccountPageProps {
  children?: React.ReactNode;
}

const Account_page: React.FC<AccountPageProps> = ({ children }) => {
  const { setUser } = useAuth();
  
  return (
    <div className={styles.pageContainer}>
      {/* BAL OLDALI MENÜ - A TE MEGLÉVŐ MENÜD */}  
        <div className={styles.menu}>
          <a href="/account/me" className={styles.menuItem}>
            My account
          </a>
          <a href="/account/orders" className={styles.menuItem}>
            My orders
          </a>
          <button 
            className={styles.logoutBtn} 
            onClick={() => logout(setUser)}
          >
            Logout
          </button>
        </div>
      
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Account_page;