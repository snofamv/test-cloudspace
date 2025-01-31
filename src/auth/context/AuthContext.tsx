import { createContext } from "react";
export interface User {
  id?: string;
  email: string;
  pwd: string;
}
interface AuthContextProps {
  authData: {
    isLogged: boolean;
    user: User;
  };
  login: (status: boolean, user: User) => void;
  logout: () => void;
  register: (user: any) => void;
  getUser: (email: string) => any;
}
export const AuthContext = createContext({} as AuthContextProps);
