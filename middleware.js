import { next } from '@vercel/edge';

export default function middleware(req) {
  return next({
    headers: {
      'Referrer-Policy': 'no-referrer-when-downgrade', // Permite más flexibilidad en el envío de la URL de referencia
      'X-Frame-Options': 'SAMEORIGIN', // Permite que tu sitio se incruste dentro de iframes en el mismo origen
      'X-Content-Type-Options': 'nosniff', // Mantiene la seguridad MIME, pero esto no debería afectar imágenes
      'X-DNS-Prefetch-Control': 'on',
      'Strict-Transport-Security':
        'max-age=31536000; includeSubDomains; preload', // Mantiene la seguridad HTTPS
    },
  });
}
