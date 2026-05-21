import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <AppRouterCacheProvider>
            <main>{children}</main>
          </AppRouterCacheProvider>
        </body>
      </html>
    )
  }