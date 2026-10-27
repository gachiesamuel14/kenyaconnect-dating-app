import './globals.css'

export const metadata = {
  title: 'KenyaConnect - Location-Based Dating',
  description: 'Connect with nearby people in Kenya. Match by county, interests, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}