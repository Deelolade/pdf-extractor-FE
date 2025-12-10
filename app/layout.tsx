// "use client"
import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryProvider } from "./providers/QueryProvider";


export const metadata: Metadata = {
  title: "DocFeel",
  description: "Upload any document and let AI do the heavy lifting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <QueryProvider>
        <ToastContainer />
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}
