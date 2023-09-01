import './globals.css'


export const metadata = {
  title: 'Image Uploader',
  description: 'api image uploader with cloudinary',
  favicon: '/src/app/favicon.ico',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
