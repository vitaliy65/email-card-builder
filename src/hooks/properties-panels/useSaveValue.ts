import { GeneralBlockProperties } from "@/types/block";
import { useState } from "react";

export default function useSaveProperties<T extends GeneralBlockProperties>(
  blockProperties: T | undefined
) {
  const [properties, setProperties] = useState<T | undefined>(blockProperties);

  /**
  // Start of Selection
  /**
   * Обновляет свойство в локальном state и возвращает сразу новое значение properties.
   *
   * @param key
   * @param property
   * @returns Обновлённый объект properties (или прошлое значение если не обновлено)
   */
  const handleSaveProperty = (key: string, property: string | number) => {
    if (property === undefined || property === null) return properties;
    if (!properties) return properties;

    setProperties((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        [key]: property,
      };
      return updated;
    });
  };

  return {
    properties,
    setProperties,
    handleSaveProperty, // теперь эта функция возвращает новое properties сразу, если нужно использовать актуальное значение синхронно.
  };
}
