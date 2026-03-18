import Account_page_menu from '../components/Account_page_menu';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const Account_me = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // 1. Hook-ok MINDIG legfelül!
  const [userApi, setUserApi] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 2. A navigációt betesszük egy useEffect-be
  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }
  }, [user, navigate]);

  // 3. Adatok lekérése
  useEffect(() => {
    async function getAccountData() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/me`, {
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        
        const data = await response.json();
        setUserApi(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false); // Befejeződött a töltés (akár sikeres, akár nem)
      }
    }
    
    // Csak akkor indítjuk el a fetch-et, ha van bejelentkezett user
    if (user) {
      getAccountData();
    }
  }, [user]);

  // Ha a user nem létezik (épp átirányítás alatt van), ne mutassunk semmit
  if (!user) return null;

  return (
    <>
      <Account_page_menu>
        <div className="accountMeContainer">
          <h1>My Account</h1>
          
          {/* 4. ITT A LÉNYEG: A userApi-t vizsgáljuk, nem a user-t! */}
          {userApi ? (
            <div className="userInfo">
              {/* Ha a userApi már nem null, biztonságosan kiírhatjuk az adatokat */}
              <p><strong>Username:</strong> {userApi.username}</p>
              <p><strong>Email:</strong> {userApi.email}</p>
            </div>
          ) : isLoading ? (
            <p>Loading user information...</p>
          ) : (
            <p>Failed to load user data.</p>
          )}
        </div>
      </Account_page_menu>
    </>
  );
};

export default Account_me;