import { GameImage } from "../../../components/GameImage";
import { IUserList } from "../../../types/IGames";

type Props = {
  item: IUserList;
};

export default function ListGameData({ item }: Props) {
  return (
    <div
      className="grid grid-cols-3 bg-base-300 items-center text-sm md:text-base pr-5"
      key={item.game.id}
    >
      <div className="w-20 lg:w-52">
        <GameImage ImageId={item.game.cover.image_id} />
      </div>
      <div className="">
        <p>{item.game.name}</p>
        <p>{item.rating}/10</p>
      </div>
      <div className="justify-self-end">
        <div className="text-center">{item.type}</div>
        <div className="flex gap-2 mt-10">
          <div>Editar</div>
          <div>Excluir</div>
        </div>
      </div>
    </div>
  );
}
