import { ref } from "vue";

export function useCreateReactiveCopy (structure, mergeOptions, handlerOptions = {}) {
    for (let key in mergeOptions) {
        if (handlerOptions.hasOwnProperty(key)) {
            mergeOptions[key] = handlerOptions[key](mergeOptions[key]);
        }

        structure[key] = ref(mergeOptions[key]);
    }
}
