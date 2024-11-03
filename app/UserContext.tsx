// UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our context data
interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType>({
  username: '',
  setUsername: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the UserContext in other components
export const useUserContext = () => useContext(UserContext);
