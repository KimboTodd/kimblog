import DropChain from '../../components/dropchain/dropchain';
import Post from '../../interfaces/post';

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  return <DropChain />;
}
