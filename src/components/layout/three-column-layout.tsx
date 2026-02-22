import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

interface ThreeColumnLayoutProps {
  sidebar?: ReactNode;
  main: ReactNode;
  detail?: ReactNode;
  className?: string;
}

export function ThreeColumnLayout({ sidebar, main, detail, className }: ThreeColumnLayoutProps) {
  return (
    <div
      className={cn(
        "flex h-screen overflow-hidden",
        className
      )}
    >
      {/* Sidebar: hidden on mobile, visible md+ */}
      {sidebar && (
        <div className="hidden md:block shrink-0">
          {sidebar}
        </div>
      )}

      {/* Main: always visible, flex-1 */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {main}
      </main>

      {/* Detail panel: hidden until lg */}
      {detail && (
        <div className="hidden lg:block w-80 shrink-0 border-l-[3px] border-charcoal-900 overflow-y-auto bg-white">
          {detail}
        </div>
      )}
    </div>
  );
}
