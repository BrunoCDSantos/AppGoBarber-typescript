/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import StorageAsy from '@react-native-community/async-storage';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await StorageAsy.multiGet([
        '@GoBarber:token',
        '@GoBarber:user'
      ]);

      if (token[1] && user[1]) {
        setData({token: token[1], user: JSON.parse(user[1])});
      }

      setLoading(false);
    }

    loadStorageData();
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await StorageAsy.multiSet([
      '@GoBarber:token', token,
      '@GoBarber:user', JSON.stringify(user)]);

    setData({
      token,
      user,
    });
  }, []);

  const signOut = useCallback(async () => {
    await StorageAsy.multiRemove([
      '@GoBarber:token',
      '@GoBarber:user'
    ]);

    setData({} as AuthState )
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an authProvider');
  }

  return context;
}
