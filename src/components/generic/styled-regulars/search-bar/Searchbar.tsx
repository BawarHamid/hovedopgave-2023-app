import { IonSearchbar } from '@ionic/react';
import styles from './Searchbar.module.css';

type SearchbarProps = {
  placeholder: string;
};

const Searchbar: React.FC<SearchbarProps> = ({ placeholder }) => (
  <div className="h-14">
    <IonSearchbar className={`${styles.search}`} placeholder={placeholder}></IonSearchbar>
  </div>
);
export default Searchbar;
