import React from "react";
import "../css/main.css";
import { NavLink } from "react-router-dom";
import ArgentBanklogo from "../img/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import useFetchUserProfile from "../hook/useFetchUserProfile";
import Profil from "../img/profil.png";
import deconnexion from "../img/deconnexion.png";

const Headers = () => {

  const { userInfo, TokenAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useFetchUserProfile();
  const logoutHandler = async () => {
    try {
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <></>;
  }

  return (
    <header>
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={ArgentBanklogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          {!TokenAuth ? (
            <NavLink to="/login" className="main-nav-item">
              <img src={Profil} alt="logo profil" className="imgprofil" />
              Sign In
            </NavLink>
          ) : (
            <div className="header_signin">
              <NavLink to="/profil" className="profil">
                <img src={Profil} alt="logo profil" className="imgprofil" />
                <h3> {userInfo.firstName}</h3>
              </NavLink>
              <NavLink to="/" onClick={logoutHandler} className="main-nav-item">
                <img
                  src={deconnexion}
                  alt="logo porte deconnexion"
                  className="imgdeco"
                />
                Sign Out
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Headers;
