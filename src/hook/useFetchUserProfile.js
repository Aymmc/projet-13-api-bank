// hooks/useFetchUserProfile.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfilMutation } from "../slices/usersApiSlice";
import { setCredentialsUser } from "../slices/authSlice";

const useFetchUserProfile = () => {
  const dispatch = useDispatch();
  const { TokenAuth } = useSelector((state) => state.auth);
  const [getProfil] = useGetProfilMutation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (TokenAuth) {
        try {
          const res = await getProfil({ token: `Bearer ${TokenAuth}` }).unwrap();
          dispatch(setCredentialsUser(res));
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [TokenAuth, dispatch, getProfil]);
};

export default useFetchUserProfile;
