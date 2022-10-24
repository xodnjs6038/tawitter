import React, { useState, useEffect } from 'react';
import AppRouter from "components/Router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  return (
  <>
    { init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
    <footer>&copy; {new Date().getFullYear()} Tawitter</footer>
  </>
  );
}

export default App;
