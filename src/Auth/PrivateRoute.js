import React from "react";
import { useAuthProvider } from "../States/AuthProvider";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";

export default function PrivateRoute({ children }) {
  const [{ user }] = useAuthProvider();
  const location = useLocation();
  return user.email ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}
