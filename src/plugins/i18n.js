import {createI18n} from 'vue-i18n';
import {messages, defaultLanguage} from "@/i18n";

export const i18n = createI18n({
    fallbackLocale: 'en',
    globalInjection: true,
    locale: defaultLanguage,
    legacy: false,
    messages,
});
