import * as validator from "@vuelidate/validators";
import {i18n} from "@/plugins/i18n";

const {createI18nMessage} = validator;

const withI18nMessage = createI18nMessage({t: i18n.global.t.bind(i18n)});

export const required = withI18nMessage(validator.required);

export const email = withI18nMessage(validator.email);

export const numeric = withI18nMessage(validator.numeric);

export const minLength = withI18nMessage(validator.minLength, {withArguments: true});
