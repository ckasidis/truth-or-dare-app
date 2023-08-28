import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { Providers } from "./providers";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });

export const metadata = {
  title: "Truth or Dare",
  description: "A fun truth or dare online game to play with friends!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
