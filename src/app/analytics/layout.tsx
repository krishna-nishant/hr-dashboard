import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "HR Analytics | Dashboard",
  description: "HR performance analytics and trends",
};

export default function AnalyticsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
} 