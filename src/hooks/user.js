import {ref, computed} from "vue";
import {useStore} from "vuex";

export function useUsers() {
    const store = useStore();

    const user = computed(() => store.getters.getCurrentUser);

    const loadUser = async (id) => {
        await store.dispatch('fetchUser', id);
    };

    const editForm = ref(user.value);

    return {user, loadUser, editForm};
}

