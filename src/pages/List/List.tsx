import EmptyList from './EmptyList';
import ListGameData from './components/ListGameData';
import ListTabs from './components/ListTabs';
import { Context } from '../../contexts/Context';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';
import { useContext, useEffect, useState } from 'react';
import FilterDropdown from './FilterDropdown';

export function List() {
  const { userList } = useContext(Context);
  const { user } = useAuth();
  const [tab, setTab] = useState('All');
  const [filterValue, setFilterValue] = useState('default');
  const [filteredUserList, setFilteredUserList] = useState(userList);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('../login');
    }
  }, []);

  useEffect(() => {
    console.log('entrei')
    setFilteredUserList(userList);
    if (filterValue === 'lowest' || filterValue === 'default') {
      setFilteredUserList(userList?.sort((a, b) => b.game.rating - a.game.rating));
    }
    if (filterValue === 'highest') {
      setFilteredUserList(userList?.sort((a, b) => a.game.rating - b.game.rating));
    }
  }, [filterValue, userList]);

  return (
    <div>
      {!user?.emailVerified ? (
        <div className='text-xl text-center'>Confirm your email first</div>
      ) : filteredUserList ? (
        <>
          <ListTabs tab={tab} setTab={setTab} />
          <div className='grid grid-cols-3 place-items-center my-4 '>
            <div>
              {tab !== 'All'
                ? filteredUserList.filter((list) => list.type === tab).length
                : filteredUserList.length}
            </div>
            <FilterDropdown setFilterValue={setFilterValue} />
          </div>
          <div>
            {tab !== 'All'
              ? filteredUserList
                  .filter((item) => item.type === tab)
                  .map((item) => (
                    <ListGameData item={item} key={item.game.id} />
                  ))
              : filteredUserList.map((item) => (
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
