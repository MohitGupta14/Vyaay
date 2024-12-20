import type { Metadata } from "next";
import { StoreProvider } from "./StoreProvider";
import { Toaster } from 'react-hot-toast'; // Import Toaster
import "./globals.css";

export const metadata: Metadata = {
  title: "Vyaay",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <Toaster /> {/* Include Toaster here */}
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
