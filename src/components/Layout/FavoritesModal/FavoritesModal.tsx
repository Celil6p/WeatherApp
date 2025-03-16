import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { removeFavorite } from '@/store/slices/favoritesSlice';
import { fetchCityWeather } from '@/store/thunks/weatherThunks';
import { useAppDispatch } from '@/store/hooks';
import styles from './FavoritesModal.module.scss';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const dispatch = useAppDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.cities);

  // View a specific city
  const handleViewCity = async (cityId: string) => {
    try {
      await dispatch(fetchCityWeather(cityId)).unwrap();
      onClose();
    } catch (error) {
      console.error("Error fetching city weather:", error);
    }
  };

  // Remove city from favorites
  const handleRemoveFavorite = (cityId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent's onClick
    dispatch(removeFavorite(cityId));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Favorite Locations</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.favoritesList}>
          {favorites.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No favorite cities yet</p>
              <p className={styles.hint}>Use the + button to add cities to your favorites</p>
            </div>
          ) : (
            <ul>
              {favorites.map(city => (
                <li 
                  key={city.id} 
                  className={styles.favoriteItem}
                  onClick={() => handleViewCity(city.id)}
                >
                  <div className={styles.cityInfo}>
                    <span className={styles.cityName}>{city.name}</span>
                    {city.temperature && (
                      <span className={styles.cityTemp}>{city.temperature}°</span>
                    )}
                    {city.description && (
                      <span className={styles.cityDesc}>{city.description}</span>
                    )}
                  </div>
                  <button 
                    className={styles.removeButton}
                    onClick={(e) => handleRemoveFavorite(city.id, e)}
                    aria-label={`Remove ${city.name} from favorites`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 