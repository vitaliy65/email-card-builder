"use client";
import { useAppDispatch } from "@/store/hooks";
import { setBlockInfo } from "@/store/slices/dragBlockSlice";
import { BlockItem } from "@/types/block";
import { ReactNode, useEffect } from "react";

export default function RememberBlockData({
  componentInfo,
  children,
}: {
  componentInfo: BlockItem;
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBlockInfo(componentInfo));
  }, []);

  return children;
}
