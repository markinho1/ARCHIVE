
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simula verificação de sessão ao carregar
  useEffect(() => {
    const storedUser = localStorage.getItem('lume_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    // Simulação de chamada API. Num cenário real, isso bateria no endpoint JWT do WordPress.
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: email.split('@')[0],
          email: email,
          role: 'member', // Assumimos que quem loga é membro
          joinedAt: new Date().toISOString(),
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
        };
        setUser(mockUser);
        localStorage.setItem('lume_user', JSON.stringify(mockUser));
        toast.success(`Bem-vindo de volta, ${mockUser.name}`);
        setIsLoading(false);
        resolve();
      }, 1500); // Delay dramático
    });
  };

  const register = async (name: string, email: string) => {
    setIsLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '2',
          name: name,
          email: email,
          role: 'member',
          joinedAt: new Date().toISOString(),
          avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
        };
        setUser(mockUser);
        localStorage.setItem('lume_user', JSON.stringify(mockUser));
        toast.success('Conta criada com sucesso!');
        setIsLoading(false);
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lume_user');
    toast('Você saiu da conta.', { icon: '👋' });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
