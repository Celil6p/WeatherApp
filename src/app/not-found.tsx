'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.scss';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <div className={styles.weatherIcon}>
            <div className={styles.cloud}></div>
            <div className={styles.cloud}></div>
            <div className={styles.rain}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={styles.questionMark}>?</div>
          </div>
        </div>
        
        <h1>404</h1>
        <h2>Oops! Location not found.</h2>
        <p>
          The weather forecast you&apos;re looking for might have drifted away 
          or doesn&apos;t exist in our database yet.
        </p>
        
        <div className={styles.actions}>
          <button 
            onClick={() => router.back()}
            className={styles.secondaryButton}
          >
            Go Back
          </button>
          <Link href="/" className={styles.primaryButton}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}