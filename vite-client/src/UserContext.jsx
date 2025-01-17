import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect( () => {
    const fetchUserProfile = async () => {
      if (!user) {
        try {
          const { data } = await axios.get("/user/profile");
          setUser(data);
        } catch (error) {
          console.error(error);
        } 
        finally {
          setReady(true);
        }
      }
    };
    
    fetchUserProfile();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
