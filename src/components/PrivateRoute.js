import { Navigate } from "react-router-dom"
import { useMutation } from "react-query";
import { loginUser } from "../apis/festivalApi";
import { useState } from "react";

export default function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"))

  if (user) return children

  return <Navigate to="/login" />
}

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user){
    return <Navigate to="/login" />
  } else if (user.roles == 5045) {
    return children
  } else {
    return <Navigate to="/NotAuth" />
  }
}

export { AdminRoute }