import React from 'react';
import styles from './Loader.module.css';

export function Loader({ fullScreen = false, size = 'md' }) {
  const containerClass = fullScreen ? styles.fullScreen : styles.container;
  
  return (
    <div className={containerClass}>
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
}

export function Skeleton({ className = '', style = {} }) {
  return (
    <div className={`${styles.skeleton} ${className}`} style={style} />
  );
}
