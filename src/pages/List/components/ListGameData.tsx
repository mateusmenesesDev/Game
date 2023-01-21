import { useContext } from 'react';
import { GameImage } from '../../../components/GameImage';
import ModalOpener from '../../../components/Modal/ModalOpener';
import RateModal from '../../../components/Modal/ModalGame';
import { Context } from '../../../contexts/Context';
import { IUserList } from '../../../types/IGames';

type Props = {
  item: IUserList;
};

export default function ListGameData({ item }: Props) {
  const { userList } = useContext(Context);
  function editGame() {
    console.log('edit', userList);
  }

  function removeGame() {
    console.log('remove', userList);
  }
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
          <div onClick={editGame} className='cursor-pointer'>
            Editar
          </div>
          <div onClick={removeGame} className='cursor-pointer'>
            Excluir
          </div>
        </div>
      </div>
    </div>
  );
}
