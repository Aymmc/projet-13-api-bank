import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetProfilMutation } from "../slices/usersApiSlice";
import { setCredentialsUser } from "../slices/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getProfil] = useGetProfilMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  // const { TokenAuth } = useSelector((state) => state.auth);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      console.log(res.body.token);
      const resProfil = await getProfil({
        token: `Bearer ${res.body.token}`,
      }).unwrap();
      dispatch(setCredentialsUser({ ...resProfil }));
      
      navigate("/profil");
      window.location.reload()
      
    } catch (err) {
      console.error("Error details:", err);
      console.error("Response data:", err.data);
    }
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={submitHandler}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" disabled={isLoading}>
              Sign In
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
