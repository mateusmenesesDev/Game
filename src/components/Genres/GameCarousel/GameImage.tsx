import { IGame } from '../../../types/IGames';

type Props = { game: IGame };

export function GameImage({ game }: Props) {
  return (
    <picture>
      <source
        srcSet={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg`}
        media='(min-width: 768px)'
      />
      <img
        src={`https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg`}
        alt=''
        className='h-full min-w-full rounded-md transition-all hover:border-4'
      />
    </picture>
  );
}
