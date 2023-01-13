import { useContext, useEffect, useState } from 'react';
import { Context } from '../../contexts/Context';
import EmptyList from './EmptyList';
import ListGameData from './components/ListGameData';
import ListTabs from './components/ListTabs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';

export function List() {
  const { userList } = useContext(Context);
  const [tab, setTab] = useState('All');
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    if (user === null) navigate('../login');
  }, []);
  return (
    <div className=''>
      {userList.length > 0 ? (
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
