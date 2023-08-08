import DropChain from '../../components/dropchain/dropchain';
import styles from './styles.module.css';

export default function Index() {
  return (
    <div>
      <div className={styles.crt}>
        <DropChain />;
      </div>
    </div>
  );
}
