<script>
import {computed, defineComponent, reactive, ref, watch, toRaw} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useError} from "@/hooks/useErrors";

import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import FileUpload from "primevue/fileupload";
import DatePicker from "@/components/DatePicker.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import ImageCard from "@/components/cards/ImageCard";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Breadcrumb, MainCard, Dropdown, InputText, Editor, Button, FileUpload, ImageCard, Checkbox, DatePicker},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('fetchServiceCategories');
      await store.dispatch('fetchBanks');
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const errors = useError();

    const files = ref([]);

    const serviceTypes = [
      {label: 'Штучная', value: 'single'},
      {label: 'Пакет услуг', value: 'package'},
      {label: 'Разовый платеж', value: 'one_time'}
    ];

    const costTypes = [
      {value: 'common', label: 'Единая'},
      {value: 'inherited', label: 'Указывается в категории'},
      {value: 'calculated', label: 'Оценивается в процессе'},
      {value: 'sum', label: 'Основывается на вложенных услугах'}
    ];

    const formData = ref({
      name_ru: '', name_en: '', name_ch: '',
      description_ru: '', description_en: '', description_ch: '',
      type: '', cost_type: '', acquiring: '', cost: '',
      subservices: [], has_intervals: '', intervals: '',
      has_date: '', has_person: '', service_category_id: '', category: ''
    });

    const datePickers = ref([
      {label: 'ПН', pick: false},
      {label: 'ВТ', pick: false},
      {label: 'СР', pick: false},
      {label: 'ЧТ', pick: false},
      {label: 'ПТ', pick: false},
      {label: 'СБ', pick: false},
      {label: 'ВС', pick: false},
    ]);

    const subserviceForm = reactive({
      name: '',
      cost: ''
    });

    const intervals = reactive({
      start: '',
      end: '',
      duration: ''
    });

    const hasIntervals = ref(false);
    const hasDate = ref(false);

    const categories = computed(() => store.getters.getListServiceCategories);
    const banks = computed(() => store.getters.getListBanks);
    const acquiring = computed(() => store.getters.getListAcquiring);

    const breadcrumbs = ref([
      {label: 'Услуги', router: {name: 'services-list', params: {type: 'single'}}},
      {label: 'Создание услуги'}
    ]);

    const selectBank = ref();

    const addSubservice = () => {
      formData.value.subservices.push({...subserviceForm});
      subserviceForm.name = subserviceForm.cost = '';
    };

    const destroySubservice = (subservice) => {
      formData.value.subservices = formData.value.subservices.filter((e) => e !== subservice);
    }


    const loadAcquiring = async () => {
      await store.dispatch('fetchAcquiring', selectBank.value);
    };

    const updateService = async () => {
      await store.dispatch('fetchUpdateService', {
        id: route.params.id,
        body: {
          ...formData.value,
          service_category_id: formData.value.category
        }
      });
    };

    const createService = async () => {
      try {
        const formDataObject = new FormData();
        for (let key in formData.value) {
          formDataObject.set(key, formData.value[key]);
        }

        formDataObject.set('service_category_id', formData.value.category)

        for(let key in intervals) {
          formDataObject.set(`intervals[${key}]`, intervals[key]);
        }

        for (let a in formData.value.subservices) {
          const subservice = formData.value.subservices[a];
          for (let b in subservice) {
            formDataObject.set(`subservices[${a}][${b}]`, subservice[b]);
          }
        }

        formDataObject.set('has_intervals', String(Number(hasIntervals.value)));
        formDataObject.set('has_date', String(Number(hasDate.value)));


        await store.dispatch('fetchCreateService', formDataObject);
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    const removeFileLoading = (file) => {
      files.value = files.value.filter(f => {
        console.log(file, toRaw(f));
        return toRaw(f) !== file;
      });
    };

    const onSelectFiles = (event) => {
      files.value = event.files;
    };

    watch(selectBank, async () => await loadAcquiring());

    return {
      categories,
      banks,
      breadcrumbs,
      formData,
      subserviceForm,
      serviceTypes,
      costTypes,
      acquiring,
      selectBank,
      addSubservice,
      destroySubservice,
      onSelectFiles,
      removeFileLoading,
      createService,
      files,
      datePickers,
      intervals,
      hasIntervals,
      hasDate,
      errors: errors.errors
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <Button @click="createService" label="Создать услугу" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid h-max">
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Наименование услуги">
          <div class="flex flex-column gap-3">
            <div class="w-full mb-3">
              <span class="p-float-label w-full">
                <InputText :class="{'p-invalid': errors.name_ru}" v-model="formData.name_ru" id="last_name" class="w-full"/>
                <label for="last_name">Введите наименование</label>
              </span>
              <span v-if="errors.name_ru" class="text-xs color-error">
                {{ errors.name_ru[0] }}
              </span>
            </div>

            <div class="w-full">
              <Dropdown
                  v-model="formData.type"
                  :options="serviceTypes"
                  :class="{'p-invalid': errors.type}"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Тип услуги"
                  class="w-full"
              />
              <span v-if="errors.type" class="text-xs color-error">
                {{ errors.type[0] }}
              </span>
            </div>
            <div class="w-full">
              <Dropdown
                  v-model="formData.category"
                  :value="formData.category"
                  :class="{'p-invalid': errors.service_category_id}"

                  :options="categories?.data?.data ?? []"
                  optionLabel="name_ru"
                  optionValue="id"
                  placeholder="Категория услуги"
                  class="w-full"
              />
             <span v-if="errors.service_category_id" class="text-xs color-error">
                {{ errors.service_category_id[0] }}
            </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Стоимость услуги">
          <div class="flex flex-column gap-3">
            <div class="w-full mb-3">
              <span class="p-float-label w-full">
                <InputText
                    v-model="formData.cost"
                    :class="{'p-invalid': errors.cost}"
                    id="last_name"
                    class="w-full"
                />
                <label for="last_name">Укажите стоимость, Р</label>
              </span>
              <span v-if="errors.cost" class="text-xs color-error">
                {{ errors.cost[0] }}
              </span>
            </div>

            <div class="w-full">
              <Dropdown
                  v-model="formData.cost_type"
                  :class="{'p-invalid': errors.cost_type}"
                  :options="costTypes"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Тип стоимости"
                  class="w-full"
              />
              <span v-if="errors.cost_type" class="text-xs color-error">
                {{ errors.cost_type[0] }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Реквизиты и эквайринг">
          <div class="flex flex-column gap-3">
            <Dropdown
                v-model="selectBank"
                :options="banks"
                optionLabel="name"
                optionValue="id"
                placeholder="Банк"
                class="w-full"
            />

            <Dropdown
                v-model="formData.acquiring"
                :options="acquiring"
                optionLabel="identifier"
                optionValue="id"
                placeholder="Идентификатор эквайринга"
                class="w-full"
            />
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Описание услуги">
      <Editor v-model="formData.description_ru" class="w-full"></Editor>
      <span v-if="errors.description_ru" class="text-xs color-error">
                {{ errors.description_ru[0] }}
      </span>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Изображения">
      <div class="grid">
        <div class="col-12 md:col-2" v-for="(file, i) in files" :key="i">
          <ImageCard @toggleCancel="removeFileLoading" :handle="() => file" :src="file.objectURL" />
        </div>

        <div class="col-12">
          <FileUpload
              name="demo[]"
              url="./upload.php"
              accept="image/*"
              :maxFileSize="10000000"
              @select="onSelectFiles"
              :multiple="true"
          >
            <template #header="{ chooseCallback }">
              <Button @click="chooseCallback" label="Добавить изображение" class="btn-primary font-light"/>
            </template>

            <template #content="{files}">&nbsp;</template>
          </FileUpload>
        </div>
      </div>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <div class="grid ">
      <div class="col-12 md:col-8">
        <MainCard title="Вложенные услуги">
          <template v-for="(subservice, i) in formData.subservices" :key="i">
            <div class="grid mb-2">
              <div class="col-6">
                <span class="p-float-label mb-3 w-full">
                  <InputText v-model="formData.subservices[i].name_ru" id="subservice_name" class="w-full"/>
                  <label for="subservice_name">Введите наименование</label>
                </span>
              </div>

              <div class="col-6 flex">
                <span class="p-float-label mb-3 w-full">
                  <InputText v-model="formData.subservices[i].cost" id="subservice_cost" class="w-full"/>
                  <label for="subservice_cost">Укажите стоимость, Р</label>
                </span>

                <Button
                    @click="destroySubservice(subservice)"
                    class="ml-2"
                    icon="pi pi-times"
                    severity="danger"
                    text
                    rounded aria-label="Cancel"
                />
              </div>
            </div>
          </template>

          <div class="grid mb-2">
            <div class="col-6">
              <span class="p-float-label mb-3 w-full">
                <InputText v-model="subserviceForm.name" id="subservice_name" class="w-full"/>
                <label for="subservice_name">Введите наименование</label>
              </span>
            </div>

            <div class="col-6 flex">
              <span class="p-float-label mb-3 w-full">
                <InputText v-model="subserviceForm.cost" id="subservice_cost" class="w-full"/>
                <label for="subservice_cost">Укажите стоимость, Р</label>
              </span>
            </div>
          </div>

          <Button @click="addSubservice" label="Добавить" class="btn-primary"/>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <h2 class="mb-4">Интервалы оказания услуг</h2>

    <div class="grid h-max">
      <div class="col-12 md:col-6 h-full">
        <MainCard :styles="{'h-full': true}" title="Дни оказания услуги">
          <DatePicker :items="datePickers"></DatePicker>
          <Checkbox
              v-model="hasDate"
              class="mt-2"
              name="interval_day"
              binary
          />
          <label class="ml-2" for="interval_day">Есть ограничения по дням</label>
        </MainCard>
      </div>
      <div class="col-12 md:col-6">
        <MainCard title="Период оказания услуги">
          <div class="flex w-100">
            <InputText v-model="intervals.start" placeholder="От" class="w-10rem" />
            <InputText v-model="intervals.end" placeholder="До" class="ml-2 w-10rem" />
            <InputText v-model="intervals.duration" placeholder="Продолжительность" class="ml-2 w-12rem" />
          </div>
          <span class="text-xs color-black-20 mb-1">Доступные интервалы: 08:00, 08:30, 09:00, 09:30, ... 18:30</span><br>
          <Checkbox
              v-model="hasIntervals"
              class="mt-2"
              name="intervals"
              binary
          />
          <label class="ml-2" for="intervals">Оказание услуг не требует интервалов</label>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style>
.p-fileupload-content {
  display: none !important;
}

.p-fileupload-buttonbar {
  background: transparent !important;
  border: none !important;
}
</style>