import React from 'react'
import Account_page_menu from '../components/Account_page_menu'
import { useAuth } from '../AuthContext';

const Account_Me = () => {
  const { user } = useAuth();
  return (
    <>
    <Account_page_menu/>
    <div className="container">
        <h1>Itt vannak a rendeléseid fasszopo {user?.username}</h1>
    </div>
    </>
  )
}

export default Account_Me