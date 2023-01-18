import React from 'react';
import { IDetaiGame, IGame } from '../../types/IGames';

type Props = {
  detailGame?: IDetaiGame;
  game?: IGame;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  addGameToList?: () => void;
};

export default function RateModal({
  detailGame,
  game,
  setRating,
  setType,
  addGameToList,
}: Props) {
  return (
    <div className='modal'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>
          {detailGame?.game.name || game?.name}
        </h3>
        <div>
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option disabled selected>
              Nota
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
        <div className='modal-action'>
          <label htmlFor='my-modal' className='btn' onClick={addGameToList}>
            Salvar
          </label>
          <label htmlFor='my-modal' className='btn'>
            Fechar
          </label>
        </div>
      </div>
    </div>
  );
}
