import Tetris from '../../components/tetris/tetris';
import Post from '../../interfaces/post';

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Tetris />
    </>
  );
}
