import { createContext, type ReactNode, useContext } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = {};
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AtuhProvider');
  }
  return context;
};
