import { createContext, ReactNode, useState } from "react";
import { useEffect } from "react";

type AuthContext = {
  session: null | UserAPIResponse
  save: (data: UserAPIResponse) => void
  logout: () => void;
  isLoadingSession: boolean;
} 

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({children}: {children: ReactNode}){
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [session, setSession] = useState<null | UserAPIResponse>(null)

  function save(data: UserAPIResponse){
    setSession(data)
    localStorage.setItem("user", JSON.stringify(data));
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setSession(JSON.parse(storedUser));
    }
    setIsLoadingSession(false);
  }, []);

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setSession(null);
  }

  return (
    <AuthContext.Provider value={ {session, save,logout, isLoadingSession} }>
      {children}
    </AuthContext.Provider>
  )
}