import { User, UserCredential } from 'firebase/auth';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { IUserList } from '../../types/IGames';
import { db } from './firebase';

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
  }
}
