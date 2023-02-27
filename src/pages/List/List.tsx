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
  const [filterValue, setFilterValue] = useState('highest');
  const [filteredUserList, setFilteredUserList] = useState(userList);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate('../login');
    }
  }, []);

  useEffect(() => {
    setFilteredUserList(userList);
    if (tab !== 'All') {
      setFilteredUserList(userList?.filter((item) => item.type === tab));
    }
  }, [filterValue, userList, tab]);

  return (
    <div>
      {console.log(filteredUserList)}
      {!user?.emailVerified ? (
        <div className='text-xl text-center'>Confirm your email first</div>
      ) : filteredUserList && userList.length > 0 ? (
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
            {filteredUserList
              .sort((a, b) => {
                return filterValue === 'lowest'
                  ? a.rating - b.rating
                  : b.rating - a.rating;
              })
              .map((item) => (
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
