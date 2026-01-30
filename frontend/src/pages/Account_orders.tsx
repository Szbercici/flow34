import React from 'react'
import Account_page_menu from '../components/Account_page_menu'
import { useAuth } from '../AuthContext';

const Account_orders = () => {
  const { user } = useAuth();
  return (
    <>
    <Account_page_menu>

      <div className="orders">
        <h1>My Orders</h1>
      </div>
      
      
    </Account_page_menu>
    </>
  )
}

export default Account_orders