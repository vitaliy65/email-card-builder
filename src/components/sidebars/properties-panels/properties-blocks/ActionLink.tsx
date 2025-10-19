import React, { useCallback, useEffect, useState } from "react";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FieldsBlockProps } from "@/types/properties-panels";

/**
 * ActionLink - поле для редактирования URL действия (для кнопки или ссылки)
 * Автоматически генерирует onClick для перехода по указанному адресу.
 */
export default function ActionLink({
  fields,
  handleSaveField,
  onChangeBlockField,
}: FieldsBlockProps) {
  const [url, setUrl] = useState(fields?.href ?? "");

  // Генерация функции для обработки перехода по ссылке
  const createOnClick = useCallback((href: string) => {
    return (
      event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
    ) => {
      event.preventDefault();
      if (href && typeof window !== "undefined") {
        window.open(
          href.startsWith("http") ? href : `https://${href}`,
          "_blank"
        );
      }
    };
  }, []);

  // Обработчик изменения поля URL
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    onChangeBlockField({ href: newUrl });
  };

  useEffect(() => {
    // При монтировании синхронизируем url, onClick
    handleSaveField("href", url);

    const onClickHandler = createOnClick(url);
    handleSaveField("onClick", onClickHandler);
    onChangeBlockField({ href: url, onClick: onClickHandler });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    setUrl(fields?.href ?? "");
  }, [fields?.href]);

  return (
    <div>
      <Label className="text-xs font-semibold text-foreground">Action</Label>
      <div className="grid w-full max-w-sm gap-6">
        <ButtonGroup>
          <ButtonGroupText asChild>
            <Label htmlFor="url">https://</Label>
          </ButtonGroupText>
          <InputGroup>
            <InputGroupInput
              id="url"
              value={url}
              placeholder="example.com"
              onChange={handleUrlChange}
              type="text"
              autoComplete="off"
            />
            <InputGroupAddon align="inline-end">
              <Link2Icon />
            </InputGroupAddon>
          </InputGroup>
        </ButtonGroup>
      </div>
    </div>
  );
}
