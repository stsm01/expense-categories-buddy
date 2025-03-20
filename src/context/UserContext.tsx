
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../utils/mockData';

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: UserRole) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  switchRole: () => {},
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the user
    const loadUser = async () => {
      // In a real app, we would fetch the user from an API or local storage
      setTimeout(() => {
        setCurrentUser(mockUsers[0]); // Default to employee role
        setIsLoading(false);
      }, 1000);
    };

    loadUser();
  }, []);

  const switchRole = (role: UserRole) => {
    const userWithRole = mockUsers.find(user => user.role === role);
    if (userWithRole) {
      setCurrentUser(userWithRole);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, switchRole, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
