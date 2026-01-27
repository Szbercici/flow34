import React from 'react'
import Account_page_menu from '../components/Account_page_menu'
import { useAuth } from '../AuthContext';

const Account_Me = () => {
  const { user } = useAuth();
  return (
    <>
    <Account_page_menu/>
    <div className="container">
        <h1>My account</h1>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
    </div>
    </>
  )
}

export default Account_Me