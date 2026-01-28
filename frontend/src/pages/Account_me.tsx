import React from 'react'
import Account_page_menu from '../components/Account_page_menu'
import { useAuth } from '../AuthContext';
import { href, useNavigate } from 'react-router-dom';

const Account_me = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
      if (user == null) {
      navigate('/login'); 
      }

  return (
    <>
    <Account_page_menu>

      <div className="accountMeContainer">
        <h1>My Account</h1>
        {user ? (
          <div className="userInfo">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
      
    </Account_page_menu>
    </>
  )
}

export default Account_me