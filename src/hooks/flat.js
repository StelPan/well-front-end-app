import {ref, reactive} from 'vue';

export function useFlat(data) {
    const flat = reactive({});

    function flatting (data) {
        for (let key in data) {
            if (data[key] instanceof Date) {
                flat[key] = data[key];
                continue;
            }

            if (typeof data[key] === 'object' && data[key] !== null) {
                flatting(data[key]);
            } else {
                flat[key] = data[key];
            }
        }

        return flat;
    }

    return flatting(data);
}