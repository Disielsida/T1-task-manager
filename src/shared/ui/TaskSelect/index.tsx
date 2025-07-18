import { Select, Option, T } from "@admiral-ds/react-ui";
import styles from "./TaskSelect.module.css";

interface SelectOption<T extends string> {
  id: T;
  label: string;
}

interface TaskSelectProps<T extends string> {
  label: string;
  placeholder: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  error?: string;
  dimension?: "s" | "m";
}

export const TaskSelect = <T extends string>({
  label,
  placeholder,
  value,
  onChange,
  options,
  error,
  dimension = "m",
}: TaskSelectProps<T>) => {
  return (
    <div className={styles.selectWrapper}>
      {/* Рендерим заголовок поля */}
      <T font="Caption/Caption 1" as="label" className={styles.label}>
        {label}
      </T>

      {/* Сам селект */}
      <Select
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value as T)}
        status={error ? "error" : undefined}
        dimension={dimension}
        mode="select"
      >
        {options.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.label}
          </Option>
        ))}
      </Select>

      {/* Подсказка или ошибка */}
      {error && (
        <T font="Caption/Caption 1" className={styles.errorText}>
          {error}
        </T>
      )}
    </div>
  );
};
