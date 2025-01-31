import { useEffect } from "react";
import { useAuth } from "../../hook/useAuth";

import { useNavigate } from "react-router";

export const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    navigate("/");
    logout();
  }, []);

  return <></>;
};
