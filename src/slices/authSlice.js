import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  TokenAuth: localStorage.getItem('TokenAuth')
    ? JSON.parse(localStorage.getItem('TokenAuth'))
    : null,
    userInfo : null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.TokenAuth = action.payload;
      localStorage.setItem('TokenAuth', JSON.stringify(action.payload.body.token));
      
      
    },
    setCredentialsUser : (state , action ) =>{
      state.userInfo = action.payload.body;
    
    },

    logout: (state, action) => {
      state.TokenAuth = null;
      localStorage.removeItem('TokenAuth');

    },
  },
});

export const { setCredentials, logout , setCredentialsUser } = authSlice.actions;

export default authSlice.reducer;
