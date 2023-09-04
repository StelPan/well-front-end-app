import * as validator from "@vuelidate/validators";
import {i18n} from "@/plugins/i18n";

const {createI18nMessage} = validator;

const withI18nMessage = createI18nMessage({t: i18n.global.t.bind(i18n)});

export const required = withI18nMessage(validator.required);

export const email = withI18nMessage(validator.email);

export const numeric = withI18nMessage(validator.numeric);

export const minLength = withI18nMessage(validator.minLength, {withArguments: true});

export const inn = withI18nMessage({
    $validator: (value) => value.length === 12,
    $message: 'Длина символов ИНН равна 10',
    $params: {
        type: 'inn'
    }
});

export const ogrn = withI18nMessage({
    $validator: (value) => value.length === 13,
    $message: 'Длина символов ОГРН равна 13',
    $params: {
        type: 'ogrn'
    }
});

export const oktmo = withI18nMessage({
    $validator: (value) => value.length === 11,
    $message: 'Длина символов ОКТМО равна 11',
    $params: {
        type: 'oktmo'
    }
});

export const passport_series = withI18nMessage({
    $validator: (value) => value.length === 4,
    $message: 'Длина символов должна быть равной 4 символам',
    $params: {
        type: 'passport_series'
    }
});


export const passport_numbers = withI18nMessage({
    $validator: (value) => value.length === 6,
    $message: 'Длина символов ИНН равна 6',
    $params: {
        type: 'passport_numbers'
    }
});

export const checking_account = withI18nMessage({
    $validator: (value) => value.length === 20,
    $message: 'Длина символов расчетного счета равна 20',
    $params: {
        type: 'checking_account'
    }
});

export const bik = withI18nMessage({
    $validator: (value) => value.length === 9,
    $message: 'Длина символов БИК равна 9',
    $params: {
        type: 'bik'
    }
});