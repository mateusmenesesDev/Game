import { useContext, useEffect, useState } from 'react';
import { GameImage } from '../../../components/GameImage';
import { Context } from '../../../contexts/Context';
import { IUserList } from '../../../types/IGames';
import { firestore } from '../../../services/firebase/firestore';
import { useAuth } from '../../../contexts/Auth';
import EditModal from './EditModal';

type Props = {
  item: IUserList;
};

export default function ListGameData({ item }: Props) {
  const { userList, setUserList } = useContext(Context);
  const { user } = useAuth();
  const [edit, setEdit] = useState(false);

  async function removeGame() {
    const confirmation = confirm('Are you sure you want to delete this game?');
    if (confirmation) {
      const newList = userList.filter((game) => game !== item);
      setUserList(newList);
      if (user) await firestore.updateFirestore(user, newList);
    }
  }

  useEffect(() => {
    if (user) firestore.updateFirestore(user, userList);
  }, [userList]);

  return (
    <div
      className='grid grid-cols-3 bg-base-300 items-center text-sm md:text-base pr-5'
      key={item.game.id}
    >
      <div className='w-20 lg:w-52'>
        <GameImage ImageId={item.game.cover.image_id} />
      </div>
      <div className=''>
        <p>{item.game.name}</p>
        {item.rating > 0 && <p>{item.rating}/10</p>}
      </div>
      <div className='justify-self-end'>
        <div className='text-center'>{item.type}</div>
        <div className='flex gap-2 mt-10'>
          <div className='cursor-pointer' onClick={() => setEdit(!edit)}>
            Edit
          </div>
          <div onClick={removeGame} className='cursor-pointer'>
            Remove
          </div>
        </div>
      </div>
      <div className={`${edit ? 'block' : 'hidden'}`}>
        <EditModal gameEdit={item} setEdit={setEdit} />
      </div>
    </div>
  );
}
