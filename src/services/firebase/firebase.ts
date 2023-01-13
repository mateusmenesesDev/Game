import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAhQjsThKdR0YQzVGAaeo4cHmOPwtB-ZdI',
  authDomain: 'game-9909c.firebaseapp.com',
  projectId: 'game-9909c',
  storageBucket: 'game-9909c.appspot.com',
  messagingSenderId: '737929390079',
  appId: '1:737929390079:web:1299347d85ff60f82329ca',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)