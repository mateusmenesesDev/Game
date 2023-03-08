import EmptyList from './EmptyList';
import ListGameData from './components/ListGameData';
import ListTabs from './components/ListTabs';
import { Context } from '../../contexts/Context';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';
import { useContext, useEffect, useState } from 'react';
import FilterDropdown from './FilterDropdown';
import { IUserList } from '../../types/IGames';

type FilterValue = 'highest' | 'lowest';

const filterGames = (games: IUserList[], tab: string): IUserList[] => {
  let filteredGames = games;

  if (tab !== 'All') {
    filteredGames = games.filter((game) => game.type === tab);
  }

  return filteredGames;
};

export function List() {
  const { userList } = useContext(Context);
  const { user } = useAuth();
  const [tab, setTab] = useState('All');
  const [filterValue, setFilterValue] = useState<FilterValue>('highest');
  const [filteredUserList, setFilteredUserList] = useState(userList);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('../login');
    }
  }, [user]);

  useEffect(() => {
    setFilteredUserList(filterGames(userList, tab));
  }, [userList, tab, filterValue]);

  const sortedUserList = filteredUserList
  .sort((a, b) => {
    return filterValue === 'lowest'
      ? a.rating - b.rating
      : b.rating - a.rating;
  })

  const displayContent = () => {
     if (sortedUserList.length > 0 || tab !== 'All') {
      return (
        <>
          <ListTabs 
            tabOptions={["All", "Playing", "Completed", "Plan to Play", "Dropped"]}
            tabState={tab}
            setTabState={setTab}
          />
          <div className='grid grid-cols-3 place-items-center my-4 '>
            <div>{sortedUserList.length}</div>
            <FilterDropdown setFilterValue={setFilterValue} />
          </div>
          <div>
            {sortedUserList.map((item) => (
              <ListGameData item={item} key={item.game.id} />
            ))}
          </div>
        </>
      );
    } else {
      return <EmptyList />;
    }
  };

  return <div>{displayContent()}</div>;
}