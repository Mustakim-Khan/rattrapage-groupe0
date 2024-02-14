import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Box, Sheet } from "@mui/joy";
import Header from "@/app/components/layout/Header";
import AuthProvider from "@/app/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GStock",
  description: "Gestion de stock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
      <AuthProvider>

      <nav><Header/></nav>
        <main>
            <Box
                sx={{
                  bgcolor: 'white',
                  gridTemplateRows: '52px 0px 1fr',
                  minHeight: '90dvh',
                }}
                >
                <Sheet>
                  {children}
                </Sheet>
            </Box>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
