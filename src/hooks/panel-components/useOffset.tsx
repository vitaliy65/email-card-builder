import { GeneralBlockProperties } from "@/types/block";

export interface PerSideProps {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

interface UseOffsetOptions {
  onChange?: (v: Partial<GeneralBlockProperties>) => void;
  handleSaveProperty: (key: string, property: string | number) => void;
}

function convertPropertiesToOffset(property: string | undefined): PerSideProps {
  if (!property) return { top: "0", right: "0", bottom: "0", left: "0" };

  let top = "0",
    right = "0",
    bottom = "0",
    left = "0";

  const parts = property.split(" ");
  [top, right, bottom, left] = [
    parts[0]?.replace("px", "") || "0",
    parts[1]?.replace("px", "") || "0",
    parts[2]?.replace("px", "") || "0",
    parts[3]?.replace("px", "") || "0",
  ];

  return { top, right, bottom, left };
}

function toStringOffset(p: PerSideProps): string {
  return `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`;
}

export default function useOffset(
  properties: GeneralBlockProperties | undefined,
  options?: UseOffsetOptions
) {
  // "Enabled for each side" is considered enabled if the padding (or margin) is 4-part value.
  function isPaddingEachSide(): boolean {
    if (!properties || typeof properties.padding !== "string") return false;
    return properties.padding.split(" ").length === 4;
  }
  function isMarginEachSide(): boolean {
    if (!properties || typeof properties.margin !== "string") return false;
    return properties.margin.split(" ").length === 4;
  }

  const enabledPaddingForEachSide = isPaddingEachSide();
  const enabledMarginForEachSide = isMarginEachSide();

  const perSidePadding: PerSideProps = convertPropertiesToOffset(
    typeof properties?.padding === "string" ? properties.padding : undefined
  );
  const perSideMargin: PerSideProps = convertPropertiesToOffset(
    typeof properties?.margin === "string" ? properties.margin : undefined
  );

  const handleSwitchPaddingMode = () => {
    // If currently enabled (has 4 values), switch to shorthand (disable)
    if (enabledPaddingForEachSide) {
      // default to "12px 24px"
      options?.handleSaveProperty?.("padding", "12px 24px");
      options?.onChange?.({ padding: "12px 24px" });
    } else {
      // go to per side, convert existing value to all sides same value
      const val =
        typeof properties?.padding === "string"
          ? properties.padding.split(" ")[0]?.replace("px", "") || "0"
          : "0";
      const toVal = `${val}px ${val}px ${val}px ${val}px`;
      options?.handleSaveProperty?.("padding", toVal);
      options?.onChange?.({ padding: toVal });
    }
  };

  const handleSwitchMarginMode = () => {
    if (enabledMarginForEachSide) {
      options?.handleSaveProperty?.("margin", "0px");
      options?.onChange?.({ margin: "0px" });
    } else {
      const val =
        typeof properties?.margin === "string"
          ? properties.margin.split(" ")[0]?.replace("px", "") || "0"
          : "0";
      const toVal = `${val}px ${val}px ${val}px ${val}px`;
      options?.handleSaveProperty?.("margin", toVal);
      options?.onChange?.({ margin: toVal });
    }
  };

  const handleChangePadding = (key: keyof PerSideProps, value: string) => {
    // Update only that side
    const updated: PerSideProps = { ...perSidePadding, [key]: value };
    const val = toStringOffset(updated);
    options?.handleSaveProperty?.("padding", val);
    options?.onChange?.({ padding: val });
  };

  const handleChangeMargin = (key: keyof PerSideProps, value: string) => {
    const updated: PerSideProps = { ...perSideMargin, [key]: value };
    const val = toStringOffset(updated);
    options?.handleSaveProperty?.("margin", val);
    options?.onChange?.({ margin: val });
  };

  const toStringPadding = (custom?: PerSideProps) =>
    toStringOffset(custom || perSidePadding);

  const toStringMargin = (custom?: PerSideProps) =>
    toStringOffset(custom || perSideMargin);

  return {
    convertPropertiesToOffset,
    enabledPaddingForEachSide,
    handleSwitchPaddingMode,
    enabledMarginForEachSide,
    handleSwitchMarginMode,
    perSidePadding,
    perSideMargin,
    handleChangePadding,
    handleChangeMargin,
    toStringPadding,
    toStringMargin,
  };
}
