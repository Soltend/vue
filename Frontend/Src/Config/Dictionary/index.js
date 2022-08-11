import { createI18n } from 'vue-i18n/index';
import getDictionary from '../../Api/Dictionary';

export default function () {
    return createI18n({
        locale: 'ru',
        fallbackLocale: 'ru',
        messages: getDictionary()
    })
}