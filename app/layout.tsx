import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mosaico | Projeto conceitual',
  description: 'Aprendizado digital em trilhas que cabem na rotina.',
  robots: { index: false, follow: true }
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
