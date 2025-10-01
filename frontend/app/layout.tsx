import type { Metadata } from "next";

// styles
import "./globals.css";
import styles from "@/styles";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, ChatRoomsProvider } from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepSearch",
  description: "AI-powered research assistant wit langgraph and GoogleGemini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ChatRoomsProvider>
          <body
            className={` relative w-screen h-screen overflow-hidden ${geistSans.variable} ${geistMono.variable} antialiased ${styles.flexCenter}`}
          >
            <div className="mainContent overflow-hidden">{children}</div>
          </body>
        </ChatRoomsProvider>
      </ThemeProvider>
    </html>
  );
}
