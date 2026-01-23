import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import Routes from "./Routes";
import SupportChat from "./components/SupportChat";
import { initializeAuth } from './slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <>
      <Routes />
      <SupportChat />
    </>
  );
}

export default App;
