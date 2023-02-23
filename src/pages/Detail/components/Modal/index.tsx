import { IGame } from '../../../../types/IGames';
import Screenshots from './Screenshots';

type Props = {
  handleClose: () => void;
  game: IGame;
  type: 'screenshots' | 'videos' | 'similar games' | undefined;
};

export default function Modal({ handleClose, game, type }: Props) {
  return (
    <div className='bg-[rgba(0,0,0,0.7)] h-screen w-screen absolute z-[99] top-0 flex items-center justify-center'>
      <div className='bg-neutral rounded-3xl max-w-[90vw] p-5'>
        {type === 'screenshots' || type === 'videos' ? (
          <Screenshots items={game[type]} />
        ) : (
          <div>teste</div>
        )}
        <button className='btn btn-primary mt-5' onClick={handleClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
