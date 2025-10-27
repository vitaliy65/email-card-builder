import React, { useEffect, useState } from "react";
import { FieldsBlockProps } from "@/types/properties-panels";
import { Label } from "@/components/ui/label";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link2Icon } from "lucide-react";

/**
 * LinkField — поле для редактирования только href (без onClick)
 */
export default function LinkField({
  block,
  fields,
  handleSaveField,
  onChange,
}: FieldsBlockProps) {
  const [url, setUrl] = useState(fields?.href ?? "");

  // только изменение href
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    handleSaveField("href", newUrl);
    onChange({ ...fields, href: newUrl });
  };

  useEffect(() => {
    setUrl(fields?.href ?? "");
  }, [fields?.href]);

  return (
    <div>
      <Label className="text-xs font-semibold text-foreground">Link URL</Label>
      <div className="grid w-full max-w-sm gap-6">
        <ButtonGroup>
          <ButtonGroupText asChild>
            <Label htmlFor="link-url">https://</Label>
          </ButtonGroupText>
          <InputGroup>
            <InputGroupInput
              id="link-url"
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
