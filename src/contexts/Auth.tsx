/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase/firebase';

type Props = {
  children: React.ReactNode;
};
type InitialContextProps = {
  user: null | User;
  signup: (email: string, password: string) => Promise<UserCredential | void>;
  signin: (email: string, password: string) => Promise<UserCredential | void>;
  signinGoogle: () => Promise<UserCredential | void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const initialContext = {
  user: null,
  signup: (email: string, password: string) => Promise.resolve(),
  signin: (email: string, password: string) => Promise.resolve(),
  signinGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  resetPassword: (email: string) => Promise.resolve(),
};

export const AuthContext = createContext<InitialContextProps>(initialContext);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signin(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signinGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user && !user?.emailVerified) {
        sendEmailVerification(user);
      }
      setLoading(false);
    });
    return unsubscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, signinGoogle, logout, resetPassword }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
