import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice"; // Si tu ne l'utilises pas, retire cette ligne
import { useUpdateUserMutation, useGetProfilMutation } from "../slices/usersApiSlice"; // Ajoute useGetProfilMutation
const Update = () => {
  const { userInfo, TokenAuth } = useSelector((state) => state.auth);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const [getProfil] = useGetProfilMutation(); // Déclare useGetProfilMutation
  const [updateSuccess, setUpdateSuccess] = useState(false); // Nouvel état
  
  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser({
        headers: {
          Authorization: `Bearer ${TokenAuth}`,
        },
        body: {
          firstName,
          lastName,
        },
      }).unwrap();
      
      // Utilise la mutation getProfil pour récupérer les données du profil utilisateur
      const profileRes = await getProfil({ token: `Bearer ${TokenAuth}` }).unwrap();
      dispatch(setCredentials(profileRes)); // Met à jour les données utilisateur dans Redux

      console.log(res, "res update");
      console.log("Profile updated successfully");
      setUpdateSuccess(true); // Indiquer que la mise à jour a réussi
    } catch (err) {
      console.error("Error during update:", err);
      console.error("Error details:", err.data || err.error);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {updateSuccess && <p>Profile updated successfully!</p>} {/* Message de succès */}
    </>
  );
};

export default Update;
