import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import Providers from './providers';
import { LANG_NAMESPACE } from '@/data/lang-namespace-constant';
import initTranslations from '../i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import  {Toaster}  from 'react-hot-toast';


export const metadata = {
  title: 'Jplus',
};
const i18nNamespaces = [LANG_NAMESPACE.LANG];

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
        <meta name="Cross-Origin-Opener-Policy" content="same-origin"/> 
      </head>
      <body className={"font-yati"}>
      <GoogleOAuthProvider clientId="711154840802-bo8njt63dv3148451asb8kme1cadlqtm.apps.googleusercontent.com">
        <Providers>
          <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>

            {children}
          </TranslationsProvider>
        </Providers>
        <Toaster position="bottom-right"
  reverseOrder={false} />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
