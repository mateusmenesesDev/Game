import EmptyList from './EmptyList';
import ListGameData from './components/ListGameData';
import ListTabs from './components/ListTabs';
import { Context } from '../../contexts/Context';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';
import { useContext, useEffect, useState } from 'react';

export function List() {
  const { userList } = useContext(Context);
  const { user } = useAuth();
  const [tab, setTab] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('../login');
    }
  }, []);

  return (
    <div>
      {!user?.emailVerified ? (
        <div className='text-xl text-center'>Confirm your email first</div>
      ) : userList ? (
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
