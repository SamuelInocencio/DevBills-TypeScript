import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firebaseAuth, googleAuthProvider } from '../config/firebase';
import type { AuthState } from '../types/auth';

interface AuthContextProps {
  authState: AuthState;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log(user);
    });
  }, []);

  const signWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider);
    } catch (error) {}
  };

  const signOut = async (): Promise<void> => {};

  return (
    <AuthContext.Provider value={{ authState, signWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AtuhProvider');
  }
  return context;
};
