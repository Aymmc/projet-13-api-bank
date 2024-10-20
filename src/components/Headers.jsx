import React from 'react';
import '../css/main.css'
import { NavLink } from 'react-router-dom';
import ArgentBanklogo from '../img/argentBankLogo.png';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import useFetchUserProfile from '../hook/useFetchUserProfile';
const Headers = () => {
  const { userInfo, TokenAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useFetchUserProfile();

  // const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      // await logoutApiCall().unwrap(); 
      dispatch(logout());               
      navigate('/login');               
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {

    return <div></div>;

  }
  if (!userInfo) {

    return <div>No user info available</div>;
  }
  return (
    <header>
      <nav className="main-nav">
        <NavLink to='/' className='main-nav-logo'>
          <img
            className="main-nav-logo-image"
            src={ArgentBanklogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          {!TokenAuth || !TokenAuth.TokenAuth ? (
            <div className='header_signin'>
             <h3> {userInfo.firstName}</h3>
            <NavLink to='/login' className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
            </div>
          ) : (
            <>
           
            <NavLink to="/" onClick={logoutHandler} className="main-nav-item">
              <i className="fa-solid fa-right-from-bracket"></i>
              Sign Out
            </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Headers;
