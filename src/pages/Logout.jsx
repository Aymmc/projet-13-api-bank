// import React from 'react'
// import { logout } from "../slices/authSlice";
// import { useLogoutMutation } from "../slices/usersApiSlice";
// import { useSelector , useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const Logout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [logoutApiCall] = useLogoutMutation();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate('/login');
//     } catch (err) {
//       console.error(err);
//     }
//   };
  
// }

// export default Logout