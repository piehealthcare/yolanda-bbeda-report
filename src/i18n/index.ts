import { createI18n } from 'vue-i18n';
import locales from './locales';

export default createI18n({
  locale: 'zh_CN',
  messages: locales,
  fallbackLocale: 'en',
});
