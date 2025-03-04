import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GraduationCap } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Radiant Prep - Diagnostic Assessment",
  description: "Online diagnostic assessment platform for students",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col`}>
        <header className="bg-green-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap size={32} />
              <h1 className="text-2xl font-bold">Radiant Prep</h1>
            </div>
            <div className="text-sm">Diagnostic Assessment Platform</div>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4 flex-grow">{children}</main>

        <footer className="bg-gray-200 p-4">
          <div className="container mx-auto text-center text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Radiant Prep. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}

