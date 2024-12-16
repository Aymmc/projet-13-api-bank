import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const Update = ({ onCancel }) => {
  const { userInfo, TokenAuth } = useSelector((state) => state.auth);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
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
      window.location.reload(); // Recharger la page automatiquement après la mise à jour
    } catch (err) {
      console.error("Error details:", err.data || err.error);
    }
  };

  return (
    <div className="update">
      <h1>Welcome back</h1>
      <form className="formupdate" onSubmit={submitHandler}>
        <div>
          <label htmlFor="firstName"></label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName"></label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
      {updateSuccess && <p>Profile updated successfully!</p>}{" "}
    </div>
  );
};

export default Update;
