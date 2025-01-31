import { useState } from "react";
import { AuthContext, User } from "./AuthContext";
import { setUser } from "../helper/setUser";
import { getUser } from "../helper/getUser";
const isLoggedOnStorage = () => {
  const storage = localStorage.getItem("session");
  const json = JSON.parse(storage!);
  if (!json) {
    return false;
  }
  return json;
};
const deleteStorage = () => localStorage.removeItem("session");
export const AuthProvider = ({ children }: any) => {
  const [authData, setAuthData] = useState({
    isLogged: isLoggedOnStorage() ? isLoggedOnStorage().isLogged : false,
    user: isLoggedOnStorage() ? isLoggedOnStorage().user : ({} as User),
  });

  const getUserFromDb = async (email: string): Promise<boolean> => {
    const userFromDb = await getUser(email);
    if (userFromDb.length === 0) {
      return false;
    }
    return true;
  };
  const login = async (status: boolean, user: User) => {
    setAuthData({ user, isLogged: status });
  };
  const logout = () => {
    deleteStorage();
    setAuthData({ isLogged: false, user: {} as User });
  };
  const register = (user: any) => {
    return setUser(user);
  };
  return (
    <>
      <AuthContext.Provider
        value={{ getUser: getUserFromDb, register, login, logout, authData }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
