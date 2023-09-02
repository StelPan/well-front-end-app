import {ref, computed, watch, toRaw} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {required, helpers} from "@vuelidate/validators";
import {useRoles} from "@/hooks/role";

export function useNotices() {
    const store = useStore();
    const {roles} = useRoles();

    const notices = computed(() => store.getters.getListNotices);
    const notice = computed(() => store.getters.getCurrentNotice);
    const typeNotices = computed(() => store.getters.getListTypeNotices);

    const isCreate = ref(false);
    const isUpdate = ref(false);

    const loadNotice = async (id) => {
        await store.dispatch('fetchNotice', id);
    };

    const loadNotices = async (params = {}) => {
        await store.dispatch('fetchNotices', params);
    };

    const loadTypeNotices = async () => {
        await store.dispatch('fetchTypeNotices');
    };

    const formCreateNotice = ref({
        push_type_id: '',
        send_date: '',
        send_time: '',
        send_now: false,
        senders_all_roles: 0,
        text: '',
        title: '',
        roles: []
    });

    const message = 'Поле обязательно для заполнения';

    const rules = {
        push_type_id: {required: helpers.withMessage(message, required)},
        send_now: {required: helpers.withMessage(message, required)},
        text: {required: helpers.withMessage(message, required)},
        title: {required: helpers.withMessage(message, required)},
        roles: {required: helpers.withMessage(message, required)},
    };

    const v$ = useVuelidate(rules, formCreateNotice);

    const createNotice = async () => {
        const result = await v$.value.$validate();
        if (!result) {
            return false;
        }

        const date = toRaw(formCreateNotice.value.send_date) instanceof Date
            ? new Date(formCreateNotice.value.send_date)
            : false;

        const send_date = date ?
            `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}`
            : '';

        const formatterForm = {
            ...formCreateNotice.value,
            send_now: Number(formCreateNotice.value.send_now),
            send_date
        };

        await store.dispatch(
            'fetchCreateNotice',
            formatterForm
        );

        isCreate.value = true;
    };

    const createNoticeAsDraft = async () => {
        const {push_type_id, text, title, roles} = formCreateNotice.value;
        const formatterForm = {push_type_id, text, title, roles, send_now: 0};
        await store.dispatch('fetchCreateNotice', formatterForm);
    };

    const updateNotice = async (id) => {
        const result = await v$.value.$validate();
        if (!result) {
            return;
        }

        const date = toRaw(formCreateNotice.value.send_date) instanceof Date
            ? new Date(formCreateNotice.value.send_date)
            : false;

        const send_date = date ?
            `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}`
            : false;

        if (send_date) {
            formCreateNotice.value.send_date = send_date;
        }

        await store.dispatch('fetchUpdateNotice', {
            id,
            body: {
                ...formCreateNotice.value,
                send_now: Number(formCreateNotice.value.send_now)
            }
        });
        isUpdate.value = true;
    };

    const deleteNotice = async (id) => {
        await store.dispatch('fetchDeleteNotice', id);
    };

    watch(
        () => formCreateNotice.value.senders_all_roles,
        (val) => {
            if (val) {
                formCreateNotice.value.roles = roles.value.map(role => role.id);
            } else {
                formCreateNotice.value.roles = [];
            }
        });

    return {
        notice,
        notices,
        typeNotices,
        updateNotice,
        loadNotices,
        loadNotice,
        loadTypeNotices,
        deleteNotice,
        createNotice,
        createNoticeAsDraft,
        formCreateNotice,
        isCreate,
        isUpdate,
        v$,
    }
}