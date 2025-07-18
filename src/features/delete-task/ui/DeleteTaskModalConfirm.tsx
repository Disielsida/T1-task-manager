import React from "react";
import { Button, T } from "@admiral-ds/react-ui";
import { BaseModal } from "@shared/ui/BaseModal";
import styles from "./DeleteTaskModalConfirm.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteTaskConfirmModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <BaseModal onClose={onClose} labelledBy="delete-task">
      <div className={styles.container}>
        <div className={styles.titleBlock}>
          <div className={styles.titleWithUnderline}>
            <T
              font="Header/HL3"
              as="h1"
              className={styles.heading}
              id="delete-task"
            >
              Удалить задачу?
            </T>
            <div className={styles.titleUnderline} />
          </div>
        </div>

        <T font="Body/Body 2 Long" className={styles.description}>
          Это действие нельзя будет отменить.
        </T>

        <div className={styles.buttons}>
          <Button appearance="danger" dimension="s" onClick={onConfirm}>
            Удалить
          </Button>
          <Button appearance="secondary" dimension="s" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
