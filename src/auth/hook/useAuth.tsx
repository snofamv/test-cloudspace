import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { authData, login, logout, register, getUser } =
    useContext(AuthContext);
  return { authData, login, logout, register, getUser };
};
