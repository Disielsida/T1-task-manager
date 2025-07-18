import { SelectField, Option } from "@admiral-ds/react-ui";
import { useSearchParams } from "react-router-dom";
import {
  categoryOptions,
  statusOptions,
  priorityOptions,
} from "@shared/constants/taskOptions";
import styles from "./TaskFilters.module.css";

/**
 * Генерирует JSX-опции для компонента SelectField.
 * В начале добавляется универсальная опция "все" с меткой `allLabel`.
 *
 * @template T - Строковой тип значения (например, категория, статус и т.д.)
 * @param options - Список доступных значений с `id` и `label`
 * @param allLabel - Название опции для выбора всех значений
 * @returns Массив JSX-элементов <Option>
 */
const renderOptions = <T extends string>(
  options: { id: T; label: string }[],
  allLabel: string,
) => [
  <Option key="All" value="All">
    {allLabel}
  </Option>,
  ...options.map((opt) => (
    <Option key={opt.id} value={opt.id}>
      {opt.label}
    </Option>
  )),
];

/**
 * Компонент фильтров задач по категориям, статусу и приоритету.
 *
 * Использует query-параметры URL (searchParams) для хранения состояния фильтров.
 * При изменении любого фильтра — обновляет URL с помощью setSearchParams.
 * Значения по умолчанию — "All", если параметр отсутствует в URL.
 *
 * Пример URL после выбора фильтров:
 * `/tasks?category=Bug&status=To%20Do&priority=High`
 */
export const TaskFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Обновляет один из параметров фильтра в URL.
   *
   * @param key - Название параметра (`category`, `status`, `priority`)
   * @param value - Значение фильтра
   */
  const update = (key: string, value: string) => {
    const newParams = { ...Object.fromEntries(searchParams), [key]: value };
    setSearchParams(newParams);
  };

  // Текущие значения фильтров из URL, или "All" по умолчанию
  const category = searchParams.get("category") || "All";
  const status = searchParams.get("status") || "All";
  const priority = searchParams.get("priority") || "All";

  return (
    <div className={styles.filtersRow}>
      <div className={styles.categoryUnderline}>
        <SelectField
          placeholder="Категория (все)"
          value={category}
          mode="select"
          onChange={(e) => update("category", e.target.value)}
        >
          {renderOptions(categoryOptions, "Категория (все)")}
        </SelectField>
      </div>

      <div className={styles.statusUnderline}>
        <SelectField
          placeholder="Статус (все)"
          value={status}
          mode="select"
          onChange={(e) => update("status", e.target.value)}
        >
          {renderOptions(statusOptions, "Статус (все)")}
        </SelectField>
      </div>

      <div className={styles.priorityUnderline}>
        <SelectField
          placeholder="Приоритет (все)"
          value={priority}
          mode="select"
          onChange={(e) => update("priority", e.target.value)}
        >
          {renderOptions(priorityOptions, "Приоритет (все)")}
        </SelectField>
      </div>
    </div>
  );
};
