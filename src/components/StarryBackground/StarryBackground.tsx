'use client';

import { useEffect, useState } from 'react';
import styles from './StarryBackground.module.scss';

interface Star {
  id: number;
  size: 'tiny' | 'small' | 'medium' | 'large';
  top: string;
  left: string;
  animationDelay: string;
}

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  animationDelay: string;
}

export default function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  
  useEffect(() => {
    // Generate random stars
    const generatedStars: Star[] = [];
    const starSizes: ('tiny' | 'small' | 'medium' | 'large')[] = ['tiny', 'small', 'medium', 'large'];
    
    // Generate 200 stars with random properties
    for (let i = 0; i < 200; i++) {
      const size = starSizes[Math.floor(Math.random() * starSizes.length)];
      generatedStars.push({
        id: i,
        size: size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`
      });
    }
    
    setStars(generatedStars);
    
    // Generate shooting stars
    const generatedShootingStars: ShootingStar[] = [];
    for (let i = 0; i < 5; i++) {
      generatedShootingStars.push({
        id: i,
        top: `${Math.random() * 50}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10 + 5}s`
      });
    }
    
    setShootingStars(generatedShootingStars);
  }, []);
  
  return (
    <div className={styles.starryBackground}>
      <div className={styles.stars}>
        {stars.map((star) => (
          <div
            key={star.id}
            className={`${styles.star} ${styles[star.size]}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay
            }}
          />
        ))}
      </div>
      
      {shootingStars.map((shootingStar) => (
        <div
          key={shootingStar.id}
          className={styles.shootingStar}
          style={{
            top: shootingStar.top,
            left: shootingStar.left,
            animationDelay: shootingStar.animationDelay
          }}
        />
      ))}
    </div>
  );
}