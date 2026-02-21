"use client";

import { IUser } from "@/app/components/types/user/user";
import { createContext, useContext } from "react";

interface AuthContextType {
  user: IUser | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);
