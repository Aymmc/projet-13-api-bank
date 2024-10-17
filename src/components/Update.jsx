import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const Update = () => {
  const { userInfo, TokenAuth } = useSelector((state) => state.auth);
  const [lastName, setLastName] = useState(""); // Correction du nom de la variable
  const [firstName, setFirstName] = useState("");
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName || ""); // Valeur par défaut
      setLastName(userInfo.lastName || ""); // Valeur par défaut
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      
      
        const res = await updateProfile({
            id: userInfo.id,
            firstName,
            lastName,
            headers: {
                Authorization: `Bearer ${TokenAuth}`,
            },
        }).unwrap();
      
      console.log(res, 'res update');
      dispatch(setCredentials(res)); // Si besoin, vérifie si res contient les nouvelles credentials
      console.log("Profile updated successfully");
    } catch (err) {
      console.log(TokenAuth);
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="firstName">First Name</label> {/* Correction du texte */}
        <input
          type="text"
          id="firstName"
          value={firstName} // Ajouter la valeur du champ
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label> {/* Correction du texte */}
        <input
          type="text"
          id="lastName"
          value={lastName} // Ajouter la valeur du champ
          onChange={(e) => setLastName(e.target.value)} // Correction ici
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Update;
