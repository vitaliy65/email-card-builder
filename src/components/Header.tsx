import { Button } from "@/components/ui/button";
import { Download, Save, Eye, Code, Undo, Redo, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              EB
            </span>
          </div>
          <h1 className="text-lg font-semibold text-foreground">
            Email Builder
          </h1>
        </div>
        <div className="h-6 w-px bg-border" />
        <span className="text-sm text-muted-foreground">Untitled Template</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Redo className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-border mx-1" />
        <Button variant="ghost" size="sm" className="h-8">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button variant="ghost" size="sm" className="h-8">
          <Code className="h-4 w-4 mr-2" />
          Code
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-border mx-1" />
        <Button variant="outline" size="sm" className="h-8 bg-transparent">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button
          size="sm"
          className="h-8 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Download className="h-4 w-4 mr-2" />
          Export HTML
        </Button>
      </div>
    </header>
  );
}
