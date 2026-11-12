import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { admin, setUnauthorizedHandler, tokenStore } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bootError, setBootError] = useState(null);

  const signOut = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  // Any 401 from the API (expired or revoked session) sends the user back to sign-in.
  useEffect(() => setUnauthorizedHandler(signOut), [signOut]);

  useEffect(() => {
    (async () => {
      try {
        const status = await admin.get('/auth/status');
        setNeedsSetup(status.data.needsSetup);
        if (tokenStore.get() && !status.data.needsSetup) {
          const me = await admin.get('/auth/me');
          setUser(me.data);
        }
      } catch (error) {
        if (error.status !== 401) setBootError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const authenticate = async (path, credentials) => {
    const response = await admin.post(path, credentials);
    tokenStore.set(response.data.token);
    setUser(response.data.admin);
    setNeedsSetup(false);
  };

  const value = {
    user,
    needsSetup,
    loading,
    bootError,
    signIn: (credentials) => authenticate('/auth/login', credentials),
    createFirstAdmin: (credentials) => authenticate('/auth/setup', credentials),
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
