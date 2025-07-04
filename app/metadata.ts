import { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [
      { 
        url: '/favicon/apple-touch-icon.png', 
        sizes: '180x180', 
        type: 'image/png' 
      }
    ],
    other: [
      {
        rel: 'manifest',
        url: '/favicon/site.webmanifest.webmanifest'
      },
      {
        rel: 'mask-icon',
        url: '/favicon/favicon.svg',
        color: '#5bbad5' // Укажите ваш основной цвет
      }
    ]
  }
};