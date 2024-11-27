import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RBAC Dashboard",
  description: "Role-Based Access Control Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <aside className="hidden w-64 overflow-y-auto border-r bg-gray-100/40 md:block">
            <Sidebar />
          </aside>
          <div className="flex flex-1 flex-col overflow-hidden">
            <Topbar />
            <main className="flex-1 overflow-y-auto bg-gray-100/40 p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

