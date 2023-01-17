/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../services/firebase/firebase';
import { Context } from './Context';

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
  const { setUserList } = useContext(Context);

  async function addUserToDB(newUser: UserCredential) {
    const firebaseUsers = await getDocs(collection(db, 'users'));
    const userExist = firebaseUsers.docs.some(
      (user) => user.data().email === newUser.user.email
    );
    console.log('🚀 ~ file: Auth.tsx:50 ~ addUserToDB ~ userExist', userExist);
    if (!userExist) {
      try {
        await addDoc(collection(db, 'users'), {
          id: newUser.user.uid,
          email: newUser.user.email,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function signup(email: string, password: string) {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    await addUserToDB(newUser);
    return newUser;
  }

  function signin(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signinGoogle() {
    const provider = new GoogleAuthProvider();
    const newUser = await signInWithPopup(auth, provider);
    await addUserToDB(newUser);
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

  async function getGamelistDB() {
    const users = await getDocs(collection(db, 'users'));
    const firebaseUser = users.docs.find(
      (userDB) => userDB.data().email === user?.email
    );
    setUserList(firebaseUser?.data().gameList);
  }

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
