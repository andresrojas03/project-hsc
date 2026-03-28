import { Inter, Dancing_Script } from "next/font/google"; // Add Great_Vibes here
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Configure the cursive font
const cursive = Dancing_Script({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive", // This creates a CSS variable we can use
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Add the variable to the body className */}
      <body className={`${inter.className} ${cursive.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
