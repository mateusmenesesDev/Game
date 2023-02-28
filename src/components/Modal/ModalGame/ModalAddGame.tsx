import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/Auth';
import { Context } from '../../../contexts/Context';
import { firestore } from '../../../services/firebase/firestore';
import { IDetaiGame } from '../../../types/IGames';

type Props = {
  detailGame: IDetaiGame;
  setModal: () => void;
};

export default function ModalAddGame({ detailGame, setModal }: Props) {
  const { userList, setUserList } = useContext(Context);
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [type, setType] = useState('');

  async function addGameToList() {
    if (!userList && detailGame && user) {
      const newList = [{ ...detailGame, rating, type }];
      setUserList(newList);
      await firestore.updateFirestore(user, newList);
      setModal();
      return;
    }
    const gameInList = userList
      ? userList?.some((item) => item.game.id === detailGame?.game.id)
      : false;
    if (!gameInList && detailGame && user) {
      const newList = [...userList, { ...detailGame, rating, type }];
      setUserList(newList);
      await firestore.updateFirestore(user, newList);
    } else {
      alert('Jogo já está na sua lista!');
    }
    setModal();
  }

  return (
    <div
      className='w-screen h-screen z-50 top-0 fixed bg-neutral
  grid place-items-center'
    >
      <div className='bg-base-300 rounded-xl p-10'>
        <h3 className='font-bold text-lg text-center mb-5'>
          {detailGame.game.name}
        </h3>
        <div>
          <select
            className='select select-bordered w-full mb-2'
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
            className='select select-bordered w-full'
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
          <button className='btn' onClick={addGameToList}>
            Salvar
          </button>
          <button className='btn btn-outline' onClick={setModal}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
