import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export function BuilderCanvas() {
  return (
    <div className="flex-1 bg-background overflow-auto">
      <div className="min-h-full p-8 flex items-start justify-center">
        <div className="w-full max-w-3xl">
          {/* Canvas toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Canvas</span>
              <div className="h-4 w-px bg-border" />
              <select className="text-sm bg-secondary text-secondary-foreground border-0 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Desktop (600px)</option>
                <option>Mobile (320px)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Zoom:</span>
              <select className="text-xs bg-secondary text-secondary-foreground border-0 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring">
                <option>100%</option>
                <option>75%</option>
                <option>50%</option>
              </select>
            </div>
          </div>

          {/* Email canvas */}
          <Card className="bg-card border-border shadow-lg">
            <div className="bg-white min-h-[600px] p-8">
              {/* Empty state */}
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Start Building Your Email
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Drag and drop components from the left sidebar to start
                  creating your email template
                </p>
              </div>
            </div>
          </Card>

          {/* Canvas footer info */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>0 blocks</span>
            <div className="h-3 w-px bg-border" />
            <span>600px width</span>
            <div className="h-3 w-px bg-border" />
            <span>Ready to export</span>
          </div>
        </div>
      </div>
    </div>
  );
}
