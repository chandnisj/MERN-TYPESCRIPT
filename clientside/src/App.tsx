import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import NavBar from "./Components/NavBar";
import SignUpModal from "./Components/SignUpModal";
import LoginModal from "./Components/LoginModal";
import { User } from "./Models/user";
import * as NoteApi from "./network/notes.api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import style from "./Styles/App.module.css";
function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [ShowSignModal, setShowsSignUpModal] = useState(false);
  const [ShowLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NoteApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowsSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={style.pageContainer }>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/Privacy" element={<PrivacyPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>
        {ShowSignModal && (
          <SignUpModal
            onDismiss={() => setShowsSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowsSignUpModal(false);
            }}
          />
        )}
        {ShowLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccefull={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
