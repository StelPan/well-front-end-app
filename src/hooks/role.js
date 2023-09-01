import {useStore} from "vuex";
import {computed} from "vue";

export function useRoles () {
    const store = useStore();

    const roles = computed(() => store.getters.getRolesList);

    const loadRoles = async () => {
        await store.dispatch('fetchRoles');
    };

    return {roles, loadRoles};
}