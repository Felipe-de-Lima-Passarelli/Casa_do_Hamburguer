"use client";

//Next
import { createContext, useContext, useState, ReactNode } from "react";

//Types
import { UserContextType } from "@/types/User";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser precisa estar dentro do Provider");
  }

  return context;
};
