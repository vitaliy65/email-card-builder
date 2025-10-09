import { BuilderCanvas } from "@/components/canvas/BuilderCanvas";
import { PropertiesPanel } from "@/components/sidebars/PropertiesPanel";
import { Header } from "@/components/Header";
import { ComponentsSidebar } from "@/components/sidebars/ComponentsSidebar";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <ComponentsSidebar />
        <BuilderCanvas />
        <PropertiesPanel />
      </div>
    </div>
  );
}
