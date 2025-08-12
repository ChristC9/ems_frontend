import { AuthProvider } from "../contexts/AuthContext"
import "./globals.css"

export const metadata = {
  title: "Meta Arc - Employee Management System",
  description: "Professional employee management system for Meta Arc company",
  generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

