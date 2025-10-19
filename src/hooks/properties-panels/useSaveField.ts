import { BlockItem } from "@/types/block";
import { useState } from "react";

/**
 * Универсальный хук для сохранения любого поля блока, вне зависимости от структуры value.
 * Value может быть любого типа (event, строка, объект и т.д.).
 */
export default function useSaveField<T extends BlockItem>(
  blockField: T | undefined
) {
  const [fields, setFields] = useState<T | undefined>(blockField);

  /**
   * Обновляет поле блока в локальном state. Value может быть любого типа.
   *
   * @param key
   * @param value - Любое значение поля (строка, число, объект, событие и т.д.)
   * @returns Обновлённый объект блока (или прошлое значение, если не обновлено)
   */
  const handleSaveField = (key: string, value: unknown) => {
    if (value === undefined || value === null) return fields;
    if (!fields) return fields;

    setFields((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return {
    fields,
    setFields,
    handleSaveField,
  };
}
