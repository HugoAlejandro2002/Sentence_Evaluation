import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import ChatGPT from './components/ChatGPT';
import Login from './components/Login';
import { firebaseapp } from './services/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebaseapp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Al desmontar el componente, se cancela la suscripción al observador
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
    
        {user ? (
          <ChatGPT user={user} />
        ) : (
          <Login />
        )}
   
    </>
  );
}

export default App;
