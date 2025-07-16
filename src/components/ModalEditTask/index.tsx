import React, { useEffect, useRef } from 'react';
import { Modal } from '@admiral-ds/react-ui';

interface CustomModalProps {
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  style?: React.CSSProperties;
}

export const ModalEditTask: React.FC<CustomModalProps> = ({
  onClose,
  children,
  labelledBy = 'modal-title',
  style,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <Modal
      aria-labelledby={labelledBy}
      onClose={onClose}
      style={{ overflow: 'auto', ...style }}
    >
      <div ref={modalRef}>
        {children}
      </div>
    </Modal>
  );
};

