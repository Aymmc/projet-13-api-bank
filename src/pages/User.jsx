import React from "react";
import Update from "../components/Update";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useFetchUserProfile from "../hook/useFetchUserProfile";


const User = () => {

  const navigate = useNavigate();
  const TokenAuth = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);
  const { loading } = useFetchUserProfile();

  console.log("userinfo", userInfo);

  useEffect(() => {
    if (!TokenAuth || !TokenAuth.TokenAuth) {
      navigate("/login");
    }
  }, [TokenAuth, navigate]);

  // Vérifie si les données sont en cours de chargement
  if (loading) {

    return <div>Loading...</div>;

  }

  // Vérifie si userInfo est défini
  if (!userInfo) {

    return <div>No user info available</div>;
  }

  return (

    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userInfo.firstName} {userInfo.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
        <Update/>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;
