// hooks/useFetchUserProfile.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfilMutation } from "../slices/usersApiSlice";
import { setCredentialsUser } from "../slices/authSlice";

const useFetchUserProfile = () => {
  const dispatch = useDispatch();
  const { TokenAuth } = useSelector((state) => state.auth);
  const [getProfil] = useGetProfilMutation();
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (TokenAuth) {
        try {
          const res = await getProfil({ token: `Bearer ${TokenAuth}` }).unwrap();
          dispatch(setCredentialsUser(res));
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false); // Fin du chargement
        }
      } else {
        setLoading(false); // Si pas de TokenAuth, fin du chargement
      }
    };

    fetchUserProfile();
  }, [TokenAuth, dispatch, getProfil]);

  return { loading }; // Retourne l'état de chargement
};

export default useFetchUserProfile;
