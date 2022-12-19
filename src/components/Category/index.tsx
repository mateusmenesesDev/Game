import { games } from '../../api';

type Props = {
  title: string;
};

export function Category({ title }: Props) {
  games();
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}
