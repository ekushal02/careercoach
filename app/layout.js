import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-gradient-to-t from-background via-background to-[#0f172a] py-12">
              <div className="container mx-auto px-6 text-center text-gray-200 space-y-4">
                <h4 className="text-lg sm:text-xl font-semibold">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Kushal Erramilli
                  </span>
                </h4>

                <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
                  <a href="/privacy" className="hover:text-cyan-400 transition">Privacy Policy</a>
                  <a href="/terms" className="hover:text-cyan-400 transition">Terms of Service</a>
                  <a href="/contact" className="hover:text-cyan-400 transition">Contact</a>
                </div>

                <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Mentora. All rights reserved.</p>
              </div>
            </footer>


          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
