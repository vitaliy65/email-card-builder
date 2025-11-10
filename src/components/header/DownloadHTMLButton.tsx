"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { convertStoreCanvasToHTML } from "@/lib/convertToHTML";

export default function DownloadHTMLButton() {
  const { canvasBlocks } = useAppSelector((s) => s.blocks);

  return (
    <Button
      size="sm"
      className="h-8 bg-primary text-primary-foreground hover:bg-primary/90"
      onClick={() => convertStoreCanvasToHTML(canvasBlocks)}
    >
      <Download className="h-4 w-4 mr-2" />
      Export HTML
    </Button>
  );
}
