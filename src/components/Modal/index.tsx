'use client'
import styles from './styles.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleOverlayClick}
      className={styles.overlay}
    >
      <div className={styles.content}>
        <button onClick={onClose} className={styles.closeButton}>Fermer</button>
        {children}
      </div>
    </div>
  );
};