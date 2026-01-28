import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage_Grotesque = Bricolage_Grotesque({
  weight: "400",
  variable: "--font-bricolage_grotesque",
});

export const metadata: Metadata = {
  title: "Workdesk",
  description:
    "A project manangement software built to conquer our bussiness goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage_Grotesque.variable} antialiased`}
      >
        <Toaster
          toastOptions={{
            className:
              "bg-white text-black dark:!bg-neutral-900 dark:!text-white border dark:!border-neutral-700",
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
