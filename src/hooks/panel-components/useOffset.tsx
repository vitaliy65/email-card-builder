import { GeneralBlockProperties } from "@/types/block";
import { useState } from "react";

export interface PerSideProps {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export default function useOffset(
  properties: GeneralBlockProperties | undefined
) {
  const [enabledPaddingForEachSide, setPaddingSides] = useState(true);
  const [enabledMarginForEachSide, setMarginSides] = useState(true);
  const [perSidePadding, setPerSidePadding] = useState<PerSideProps>({
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
  });
  const [perSideMargin, setPerSideMargin] = useState<PerSideProps>({
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
  });

  const convertPropertiesToOffset = (
    property: string | undefined
  ): PerSideProps => {
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
  };

  const handleSwitchPaddingMode = () => {
    setPaddingSides((prev) => !prev);
    setPerSidePadding(
      convertPropertiesToOffset(properties?.padding?.toString())
    );
  };

  const handleSwitchMarginMode = () => {
    setMarginSides((prev) => !prev);
    setPerSideMargin(convertPropertiesToOffset(properties?.margin?.toString()));
  };

  const handleChangePadding = (key: string, value: string) => {
    const updatedPadding = {
      ...perSidePadding,
      [key]: value,
    };
    setPerSidePadding(updatedPadding);
  };

  const handleChangeMargin = (key: string, value: string) => {
    const updatedMargin = {
      ...perSideMargin,
      [key]: value,
    };
    setPerSideMargin(updatedMargin);
  };

  const toStringPadding = () => {
    return `${perSidePadding.top}px ${perSidePadding.right}px ${perSidePadding.bottom}px ${perSidePadding.left}px`;
  };

  const toStringMargin = () => {
    return `${perSideMargin.top}px ${perSideMargin.right}px ${perSideMargin.bottom}px ${perSideMargin.left}px`;
  };

  return {
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
