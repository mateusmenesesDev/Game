import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/Auth';
import { Context } from '../../../contexts/Context';
import { firestore } from '../../../services/firebase/firestore';
import { IDetaiGame } from '../../../types/IGames';

type Props = {
  detailGame?: IDetaiGame;
};

export default function ModalGame({ detailGame }: Props) {
  const { userList, setUserList } = useContext(Context);
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [type, setType] = useState('');
  function addGameToList() {
    if (!userList && detailGame) {
      setUserList([{ ...detailGame, rating, type }]);
      return;
    }
    const gameInList = userList
      ? userList?.some((item) => item.game.id === detailGame?.game.id)
      : false;
    if (!gameInList && detailGame) {
      setUserList([...userList, { ...detailGame, rating, type }]);
    } else {
      alert('Jogo já está na sua lista!');
    }
  }

  useEffect(() => {
    if (user) firestore.updateFirestore(user, userList);
  }, [userList]);
  return (
    <div className='modal px-4'>
      <div className='modal-box w-auto md:px-14'>
        <h3 className='font-bold text-lg mb-12 text-center'>
          {detailGame?.game.name}
        </h3>
        <div>
          <select
            className='select select-bordered w-full max-w-xs mb-2'
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option disabled selected>
              Rate
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={(e) => setType(e.target.value)}
          >
            <option disabled selected>
              Type
            </option>
            <option value='Completed'>Completed</option>
            <option value='Playing'>Playing</option>
            <option value='Dropped'>Dropped</option>
            <option value='Plan to Play'>Plan to Play</option>
          </select>
        </div>
        <div className='flex justify-between mt-5'>
          <label
            htmlFor='my-modal'
            className='btn btn-primary px-6'
            onClick={addGameToList}
          >
            Save
          </label>
          <label htmlFor='my-modal' className='btn btn-outline px-6'>
            Close
          </label>
        </div>
      </div>
    </div>
  );
}
