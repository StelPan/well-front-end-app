import {computed, ref, unref} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {required, numeric, timehour, correctDate} from "@/utils/i18n-validators";

export function useServices () {
    const store = useStore();

    const service = computed(() => store.getters.getCurrentService);
    const services = computed(() => store.getters.getListServices);

    const isCreate = ref(false);
    const isUpdate = ref(false);

    const schema = {
        service_category_id: '', name_ru: '', description_ru: '', persons: '',
        type: '', cost_type: '', cost: '',
        has_date: false, has_persons: false, has_intervals: true, variants: [],
        subservices: [], intervals: [],
        days: [],
    };

    const form = ref({...schema});

    const rules = {
        cost: {required, numeric},
        name_ru: {required},
        service_category_id: {required},
        description_ru: {required},
        type: {required},
        cost_type: {required},
        has_date: {required},
        has_intervals: {required},
    };

    const v$ = useVuelidate(rules, form);

    const files = ref({
        photos: []
    });

    const intervalForm = ref({
        start: '',
        end: '',
        duration: ''
    });

    const intervalRules = {
        start: {correctDate},
        end: {correctDate},
        duration: {numeric},
    };

    const iv$ = useVuelidate(intervalRules, intervalForm);

    const selectFiles = ({files: photos}) => {
        for(let photo of photos) {
            files.value.photos.push(photo);
        }
    };

    const destroyFileLocal = (photo) => {
        files.value.photos = files.value.photos.filter(p => p !== photo);
    };

    const loadService = async (id) => {
        await store.dispatch('fetchService', id);
    };

    const loadServices = async (params = {}) => {
        await store.dispatch('fetchServices', params);
    };

    const uploadPhotoService = async (id, photo) => {
        await store.dispatch('fetchUploadServicePhoto', {id, photo});
    };

    const createService = async () => {
        const result = await v$.value.$validate();

        if (!result) {
            return;
        }

        if (form.value.has_intervals) {
            const resultIntervals = await iv$.value.$validate();
            if (!resultIntervals) {
                return;
            }
        }


        const formData = {};
        for (let key in form.value) {
            if (key === 'intervals') continue;

            if (key === 'subservices') {
                formData.subservices = [];
                for (let subservice of form.value.subservices) {
                    formData.subservices.push(subservice);
                }

                continue;
            }

            if (key === 'has_date' || key === 'has_intervals' || key === 'has_persons') {
                formData[key] = Number(form.value[key]);
            } else {
                formData[key] = form.value[key]
            }
        }

        if (form.value.has_intervals) {
            formData.intervals = {};
            formData.intervals.start = intervalForm.value.start;
            formData.intervals.end = intervalForm.value.end;
            formData.intervals.duration = intervalForm.value.duration;
        }

        await store.dispatch('fetchCreateService', formData);

        const created = computed(() => store.getters.getCreateService);
        if (files.value.photos) {
            const requests = [];
            for (let photo of files.value.photos) {
                const data = new FormData();
                data.set('photo', photo);
                requests.push(store.dispatch('fetchUploadServicePhoto', {
                    id: created.value.id,
                    body: data,
                }));
            }

            await Promise.all(requests);
        }

        isCreate.value = true;
    };

    const updateService = async () => {
        const result = await v$.value.$validate();
        if (!result) {
            return;
        }

        const formData = {};
        for (let key in form.value) {
            if (key === 'intervals') continue;

            if (key === 'subservices') {
                formData.subservices = [];
                for (let subservice of form.value.subservices) {
                    formData.subservices.push(subservice);
                }

                continue;
            }

            if (key === 'has_date' || key === 'has_intervals' || key === 'has_persons') {
                formData[key] = Number(form.value[key]);
            } else {
                formData[key] = form.value[key]
            }
        }

        if (form.value.has_intervals) {
            formData.intervals = {};
            formData.intervals.start = intervalForm.value.start;
            formData.intervals.end = intervalForm.value.end;
            formData.intervals.duration = intervalForm.value.duration;
        }

        await store.dispatch('fetchUpdateService', {
            id: service.value.id,
            body: formData
        });

        if (files.value.photos) {
            const requests = [];
            for (let photo of files.value.photos) {
                const data = new FormData();
                data.set('photo', photo);
                requests.push(store.dispatch('fetchUploadServicePhoto', {
                    id: service.value.id,
                    body: data,
                }));
            }

            await Promise.all(requests);
        }


        isUpdate.value = true;
    };

    const subServiceForm = ref({
        name: '',
        cost: ''
    });

    const subServiceRules = {
        name: {required},
        cost: {required, numeric}
    };

    const sv$ = useVuelidate(subServiceRules, subServiceForm);

    const addSubService = async () => {
        const result = await sv$.value.$validate();
        if (!result) {
            return;
        }

        const subservice = unref(subServiceForm);

        form.value.subservices.push({...subservice});

        subServiceForm.value.name = subServiceForm.value.cost = '';
    };

    const destroySubService = (subService) => {
        form.value.subservices = form.value.subservices.filter(sub => sub.id !== subService.id);
    };

    const destroyService = async (id) => {
        //
    };

    const changeDays = ({day, pick}) => {
        const find = form.value.days.find(d => d === day);
        if (!pick && find) {
            form.value.days = form.value.days.filter(d => d !== find);
        }

        if (pick && !find) {
            form.value.days.push(day);
        }
    };

    return {
        services, service, form, subServiceForm, files, intervalForm, isCreate, isUpdate,
        updateService, loadService, loadServices, createService, destroyFileLocal, changeDays,
        destroyService, selectFiles, destroySubService, addSubService,
        v$, sv$, iv$,
    };
}