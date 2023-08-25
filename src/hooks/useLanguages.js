import {ref} from "vue";

export const useLanguages  = () => {
    const languages = ref([{
        label: 'Русский',
        value: 'ru'
    }, {
        label: 'Английский',
        value: 'en'
    }, {
        label: 'Китайский',
        value: 'ch'
    }]);

    return { languages };
};