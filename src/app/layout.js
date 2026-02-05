import "./globals.css";
import { Libre_Baskerville } from "next/font/google";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={libreBaskerville.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
