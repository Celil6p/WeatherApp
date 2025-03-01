"use client"

import Link from 'next/link';
import styles from './Header.module.scss';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Weather App
      </Link>
      <nav className={styles.nav}>
        <Link 
          href="/" 
          className={pathname === '/' ? styles.active : ''}
        >
          Home
        </Link>
        <Link 
          href="/weather" 
          className={pathname.startsWith('/weather') ? styles.active : ''}
        >
          Weather
        </Link>
        <Link 
          href="/favorites" 
          className={pathname === '/favorites' ? styles.active : ''}
        >
          Favorites
        </Link>
      </nav>
    </header>
  );
}