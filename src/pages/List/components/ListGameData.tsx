import { GameImage } from "../../../components/GameImage";
import { IUserList } from "../../../types/IGames";

type Props = {
  item: IUserList;
};

export default function ListGameData({ item }: Props) {
  return (
    <div
      className="grid place-items-center bg-base-300 grid-cols-3 text-sm md:text-base"
      key={item.game.id}
    >
      <div className="w-24 lg:w-52">
        <GameImage ImageId={item.game.cover.image_id} />
      </div>
      <div className="flex justify-between w-full">
        <div>
          <p>{item.game.name}</p>
          <p>{item.rating}/10</p>
        </div>
      </div>
      <div className="flex gap-10">
        <div>{item.type}</div>
        <div>Editar</div>
      </div>
    </div>
  );
}
