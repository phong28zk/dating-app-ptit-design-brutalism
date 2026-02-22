import { AppProvider } from "@/lib/app-state-context";

export const metadata = { title: "PTIT Dating App — Demo" };

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}
