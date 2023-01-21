import { User, UserCredential } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { IUserList } from '../../types/IGames';
import { db } from './firebase';

type Props = {
  user: User;
  setUserList: React.Dispatch<React.SetStateAction<IUserList[] | []>>
}
export const firestore = {
  addUserToDB: async (newUser: UserCredential) => {
    const id = newUser.user.uid;
    const usersRef = collection(db, 'users');
    try {
      await setDoc(doc(usersRef, id), {
        email: newUser.user.email,
      });
    } catch (error) {
      console.log(error);
    }
  },
  
  updateFirestore: async (user:User, userList:IUserList[]) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      updateDoc(userRef, {
        gameList: userList,
      });
    }
  },

  getGameListFirestore:async ({user, setUserList}: Props) => {
    const userRef = doc(db, 'users', user.uid);
    const docUser = await getDoc(userRef);
    const userData = docUser.data();
    setUserList(userData?.gameList);
  }
}
// DECLAÇÃO DE TYPE E INTERFACE