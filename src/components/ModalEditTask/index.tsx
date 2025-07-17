import React, { useEffect, useRef, useState } from 'react';
import { Modal } from '@admiral-ds/react-ui';
import styles from './ModalEditTask.module.css';

interface CustomModalProps {
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
}

export const ModalEditTask: React.FC<CustomModalProps> = ({
  onClose,
  children,
  labelledBy = 'modal-edit',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSelectOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isSelectOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !isSelectOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, isSelectOpen]);

  useEffect(() => {
    document.documentElement.classList.add('modal-open');
    return () => {
      document.documentElement.classList.remove('modal-open');
    };
  }, []);

  return (
    <Modal
      aria-labelledby={labelledBy}
      onClose={onClose}
      mobile={isMobile}
    >
      <div
        ref={modalRef}
        className={styles.modalContent}
        onFocusCapture={() => setIsSelectOpen(true)}
        onBlurCapture={() => setIsSelectOpen(false)}
      >
        {children}
      </div>
    </Modal>
  );
};
