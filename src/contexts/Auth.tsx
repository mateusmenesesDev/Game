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
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
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
  const { setUserList, userList } = useContext(Context);

  async function addUserToDB(newUser: UserCredential) {
    const id = newUser.user.uid;
    const usersRef = collection(db, 'users');
    try {
      await setDoc(doc(usersRef, id), {
        email: newUser.user.email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function signup(email: string, password: string) {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    await addUserToDB(newUser);
    return newUser;
  }

  async function getGamelistDB({ user }: UserCredential) {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const docUser = await getDoc(userRef);
      const userData = docUser.data();
      setUserList(userData?.gameList);
    }
  }

  async function signin(email: string, password: string) {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  }

  async function signinGoogle() {
    const provider = new GoogleAuthProvider();
    const newUser = await signInWithPopup(auth, provider);
    const userRef = doc(db, 'users', newUser.user.uid);
    const userDoc = await getDoc(userRef);
    const userExist = userDoc.exists();
    if (!userExist) await addUserToDB(newUser);
    return newUser;
    // await getGamelistDB(newUser);
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
