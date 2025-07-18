import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@admiral-ds/react-ui";
import styles from "./BaseModal.module.css";

interface BaseModalProps {
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  onClose,
  children,
  labelledBy = "modal-edit",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.documentElement.classList.add("modal-open");
    requestAnimationFrame(() => {
      document.dispatchEvent(new Event("modal-opened"));
    });

    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, []);

  return (
    <Modal aria-labelledby={labelledBy} onClose={onClose} mobile={isMobile}>
      <div ref={modalRef} className={styles.modalContent}>
        {children}
      </div>
    </Modal>
  );
};
