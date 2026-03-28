import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './Modal.module.css';

export function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  
  useOutsideClick(modalRef, () => {
    if (isOpen) onClose();
  });

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
