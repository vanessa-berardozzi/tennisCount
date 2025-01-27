'use client'
import styles from './styles.module.css';

/**
 * @interface ModalProps
 * @description Props for the Modal component
 * @property {boolean} isOpen - Controls the visibility of the modal
 * @property {() => void} onClose - Callback function to close the modal
 * @property {React.ReactNode} children - Content to be rendered inside the modal
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * @component Modal
 * @description A reusable modal component that can be shown/hidden
 * 
 * @param {ModalProps} props - The component props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {() => void} props.onClose - Callback function to close the modal
 * @param {React.ReactNode} props.children - Content to be rendered inside the modal
 * 
 * @example
 * <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
 *   <div>Modal content here</div>
 * </Modal>
 * 
 * @returns {JSX.Element | null} The Modal component or null if closed
 */
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