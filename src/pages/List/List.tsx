import { useContext, useEffect, useState } from 'react';
import { Context } from '../../contexts/Context';
import EmptyList from './EmptyList';
import ListGameData from './components/ListGameData';
import ListTabs from './components/ListTabs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase/firebase';

export function List() {
  const { userList, setUserList } = useContext(Context);
  const [tab, setTab] = useState('All');
  const { user } = useAuth();
  const navigate = useNavigate();
  async function getGamelistDB() {
    const users = await getDocs(collection(db, 'users'));
    const firebaseUser = users.docs.find(
      (userDB) => userDB.data().email === user?.email
    );
    console.log(
      '🚀 ~ file: Auth.tsx:92 ~ getGamelistDB ~ firebaseUser',
      firebaseUser?.data().gameList
    );
    setUserList(firebaseUser?.data().gameList);
  }

  useEffect(() => {
    if (user === null) {
      navigate('../login');
    } else {
      getGamelistDB();
    }
  }, []);
  return (
    <div>
      {!user?.emailVerified ? (
        <div className='text-xl text-center'>Confirm your email first</div>
      ) : userList.length > 0 ? (
        <>
          <ListTabs tab={tab} setTab={setTab} />
          <div className='grid grid-cols-3 place-items-center my-4 '>
            <div>plataform</div>
            <div>
              {tab !== 'All'
                ? userList.filter((list) => list.type === tab).length
                : userList.length}
            </div>
            <div>order</div>
          </div>
          <div>
            {tab !== 'All'
              ? userList
                  .filter((item) => item.type === tab)
                  .map((item) => (
                    <ListGameData item={item} key={item.game.id} />
                  ))
              : userList.map((item) => (
                  <ListGameData item={item} key={item.game.id} />
                ))}
          </div>
        </>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}
