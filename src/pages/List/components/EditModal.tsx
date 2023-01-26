import React, { SetStateAction, useContext, useState } from 'react';
import { Context } from '../../../contexts/Context';
import { IUserList } from '../../../types/IGames';

type Props = {
  gameEdit: IUserList;
  setEdit: React.Dispatch<SetStateAction<boolean>>;
};
export default function EditModal({ gameEdit, setEdit }: Props) {
  const [newType, setNewType] = useState('');
  const [newRate, setNewRate] = useState(0);
  const { userList, setUserList } = useContext(Context);

  function editGame() {
    const newList = userList.filter(({ game }) => game.id !== gameEdit.game.id);
    setUserList([...newList, { ...gameEdit, rating: newRate, type: newType }]);
    setEdit(false);
  }

  return (
    <div
      className='w-screen h-screen z-50 top-0 absolute bg-neutral
    grid place-items-center'
    >
      <div className='bg-base-300 rounded-xl p-10'>
        <h3 className='font-bold text-lg text-center mb-5'>
          {gameEdit.game.name}
        </h3>
        <div>
          <select
            className='select select-bordered w-full mb-2'
            onChange={(e) => setNewRate(Number(e.target.value))}
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
            onChange={(e) => setNewType(e.target.value)}
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
          <button className='btn' onClick={editGame}>
            Salvar
          </button>
          <button className='btn btn-outline' onClick={() => setEdit(false)}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
