import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserProvider";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useUser();

  useEffect(() => {
    async function onLogout() {
      await logout();
      setIsLoading(false);
    }
    onLogout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <h3>Logging out...</h3>;
  }

  return <Navigate to="/login" replace />;
}
