'use client';
import React, { PropsWithChildren } from 'react';
import Drawer from './Drawer';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface PageLayoutProps extends PropsWithChildren {
  title?: string;
}
const PageLayout: React.FC<PageLayoutProps> = ({ children, ...rest }: PageLayoutProps) => {
  const pathname = usePathname();

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  return (
    <>
      {pathname === `/` ||
      pathname === `/${currentLocale}/login` ||
      pathname === `/${currentLocale}/signup` ||
      pathname === `/${currentLocale}/forget-pass` ||
      pathname === `/${currentLocale}/pass-reset` ||
      pathname === `/` ||
      pathname === `/login` ||
      pathname === `/signup` ||
      pathname === `/forget-pass` ||
      pathname === `/pass-reset` ? (
        children
      ) : (
        <Drawer {...rest}>{children}</Drawer>
      )}
    </>
  );
};

export default PageLayout;
