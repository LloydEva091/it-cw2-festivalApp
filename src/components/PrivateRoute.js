import { Navigate } from "react-router-dom"


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