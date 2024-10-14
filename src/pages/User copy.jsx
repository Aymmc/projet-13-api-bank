import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useFetchUserProfile from "../hook/useFetchUserProfile";

const User = () => {
  const navigate = useNavigate();
  const TokenAuth = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  const { loading } = useFetchUserProfile(); // Récupère l'état de chargement
  console.log("userinfo", userInfo);

  useEffect(() => {
    if (!TokenAuth || !TokenAuth.TokenAuth) {
      navigate("/login");
    }
  }, [TokenAuth, navigate]);

  // Vérifie si les données sont en cours de chargement
  if (loading) {
    return <div>Loading...</div>; // Affiche un message de chargement
  }

  // Vérifie si userInfo est défini
  if (!userInfo) {
    return <div>No user info available</div>; // Affiche un message si aucune info utilisateur
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userInfo.firstName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      {/* Le reste de ton composant ici */}
    </main>
  );
};

export default User;
