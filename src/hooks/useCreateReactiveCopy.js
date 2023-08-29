import { ref } from "vue";

export function useCreateReactiveCopy (structure, mergeOptions, handlerOptions = {}) {
    for (let key in mergeOptions) {
        if (handlerOptions.hasOwnProperty(key)) {
            structure[key] = handlerOptions[key](mergeOptions[key]);
        }

        if (typeof structure[key] === 'object' && structure.hasOwnProperty(key)) {
            useCreateReactiveCopy(structure[key], mergeOptions[key]);
        }
        if (structure.hasOwnProperty(key)) {
            structure[key] = ref(mergeOptions[key]);
        }
    }
}
