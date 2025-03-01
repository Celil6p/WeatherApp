import styles from './page.module.scss';
import WeatherCard from '@/components/WeatherCard/WeatherCard';
import weatherData from '@/data/turkeyWeather.json';
import Image from 'next/image';

export default function HomePage() {
  // Use the imported weather data
  const { currentLocation } = weatherData;
  
  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h2 className={styles.cityName}>{currentLocation.city}</h2>
        <div className={styles.temperature}>{currentLocation.temperature}°</div>
        <div className={styles.weatherDescription}>{currentLocation.description}</div>
        <div className={styles.highLowTemp}>
          H:{currentLocation.highTemp}° L:{currentLocation.lowTemp}°
        </div>
      </div>
      
      <section className={styles.heroSection}>
        <div className={styles.mobileHouseImage}>
          <Image 
            src="/house.png" 
            alt="House" 
            width={200} 
            height={200} 
            priority
          />
        </div>
        
        <div className={styles.cardGrid}>
          <div className={`${styles.weatherCardWrapper} ${styles.featured}`}>
            <WeatherCard {...currentLocation} />
          </div>
        </div>
      </section>
      
      {/* <h2 className={styles.sectionTitle}>Weather Insights</h2>
      
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>3</div>
            <div className={styles.statLabel}>Low Health Risk</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>4</div>
            <div className={styles.statLabel}>UV Index</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>9.7 km/h</div>
            <div className={styles.statLabel}>Wind Speed</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>1.8 mm</div>
            <div className={styles.statLabel}>Rainfall</div>
          </div>
        </div>
      </section>
      
      <section className={styles.forecastSection}>
        <h2 className={styles.sectionTitle}>7-Day Forecast</h2>
        <div className="placeholder" style={{height: '300px'}}>
          Weekly Forecast Chart (Placeholder)
        </div>
      </section>
      
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h3>Weather Maps</h3>
          <p>
            Explore interactive weather maps showing precipitation, temperature, 
            wind speed, and more. Track storms and weather patterns in real-time.
          </p>
          <div className="placeholder" style={{height: '200px', marginTop: '1rem'}}>
            Weather Map Preview (Placeholder)
          </div>
        </div>
        
        <div className={styles.infoCard}>
          <h3>Air Quality</h3>
          <p>
            Monitor air quality data including pollution levels, allergens, and health 
            recommendations based on current conditions.
          </p>
          <div className="placeholder" style={{height: '200px', marginTop: '1rem'}}>
            Air Quality Chart (Placeholder)
          </div>
        </div>
      </section> */}
    </div>
  );
}