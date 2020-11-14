import React, { useState, useEffect } from "react";
import "./App.css";
import AppRouter from "./config/route";
import { firebase } from "./config/firebase";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    listenAuthentication();
  }, []);

  const listenAuthentication = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      setLoading(false);
      setLoggedIn(user ? { email: user.email, uid: user.uid } : false);
    });
  };

  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} isLoading={isLoading} />
    </div>
  );
}

export default App;
