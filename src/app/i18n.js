import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '../../i18nConfig';

export default async function initTranslations(locale, namespaces, i18nInstance, resources) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language, namespace) => import(`../../locales/${language}/${namespace}.json`)
      )
    );
  }
  const DETECTION_OPTIONS = {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  };

  await i18nInstance.init({
    fallbackLng: 'en',
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
    detection: DETECTION_OPTIONS,
    interpolation: {
      escapeValue: false,
    },
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
