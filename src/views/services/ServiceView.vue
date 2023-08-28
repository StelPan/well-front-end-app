<script>
import {computed, defineComponent, onMounted, reactive, ref, watch, toRaw} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Editor from "primevue/editor";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import ImageCard from "@/components/cards/ImageCard";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Breadcrumb, MainCard, Dropdown, InputText, Editor, Button, FileUpload, ImageCard},
  setup() {
    const store = useStore();
    const route = useRoute();

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

    const subserviceForm = reactive({
      name_ru: '',
      cost: ''
    });

    const categories = computed(() => store.getters.getListServiceCategories);
    const service = computed(() => store.getters.getCurrentService);
    const banks = computed(() => store.getters.getListBanks);
    const acquiring = computed(() => store.getters.getListAcquiring);

    const breadcrumbs = ref([]);
    const selectBank = ref();

    const addSubservice = () => {
      formData.value.subservices.push({...subserviceForm});
      subserviceForm.name_ru = subserviceForm.cost = '';
    };

    const destroySubservice = (subservice) => {
      formData.value.subservices = formData.value.subservices.filter((e) => e !== subservice);
    }

    const loadService = async () => {
      await store.dispatch('fetchService', route.params.id);
    };

    const loadBanks = async () => {
      await store.dispatch('fetchBanks');
    };

    const loadServiceCategories = async () => {
      await store.dispatch('fetchServiceCategories');
    };

    const loadAcquiring = async () => {
      await store.dispatch('fetchAcquiring', selectBank.value);
    };

    const deleteServicePhoto = async (photo) => {
      await store.dispatch('fetchDestroyServicePhoto', {
        id: service.value.id,
        uuid: photo.uuid
      })
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

    onMounted(async () => {
      await loadServiceCategories();
      await loadService();
      await loadBanks()

      useCreateReactiveCopy(
          formData.value,
          service.value,
          {category: (c) => c.id}
      );

      breadcrumbs.value = [
        {label: 'Услуги', router: {name: 'services-list', params: {type: 'single'}}},
        {label: service.value.name_ru}
      ];
    });

    return {
      service,
      categories,
      banks,
      breadcrumbs,
      formData,
      subserviceForm,
      serviceTypes,
      costTypes,
      acquiring,
      selectBank,
      updateService,
      addSubservice,
      destroySubservice,
      onSelectFiles,
      removeFileLoading,
      deleteServicePhoto,
      files
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <Button @click="updateService" label="Сохранить изменения" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid h-max">
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Наименование услуги">
          <div class="flex flex-column gap-3">
            <span class="p-float-label mb-3 w-full">
              <InputText v-model="formData.name_ru" id="last_name" class="w-full"/>
              <label for="last_name">Введите наименование</label>
            </span>

            <Dropdown
                v-model="formData.type"
                :options="serviceTypes"
                optionLabel="label"
                optionValue="value"
                placeholder="Тип услуги"
                class="w-full"
            />

            <Dropdown
                v-model="formData.category"
                :value="formData.category"
                :options="categories?.data?.data ?? []"
                optionLabel="name_ru"
                optionValue="id"
                placeholder="Категория услуги"
                class="w-full"
            />
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Стоимость услуги">
          <div class="flex flex-column gap-3">
            <span class="p-float-label mb-3 w-full">
              <InputText v-model="formData.cost" id="last_name" class="w-full"/>
              <label for="last_name">Укажите стоимость, Р</label>
            </span>

            <Dropdown
                v-model="formData.cost_type"
                :options="costTypes"
                optionLabel="label"
                optionValue="value"
                placeholder="Тип стоимости"
                class="w-full"
            />
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
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Изображения">
      <div class="grid">
        <div class="col-12 md:col-2" v-for="(photo, i) in service.photos" :key="i">
          <ImageCard @toggleCancel="deleteServicePhoto" :handle="() => photo" :src="photo.original_url" />
        </div>

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
                <InputText v-model="subserviceForm.name_ru" id="subservice_name" class="w-full"/>
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

    <div class="grid">
      <div class="col-12 md:col-6">
        <MainCard title="Дни оказания услуги"></MainCard>
      </div>
      <div class="col-12 md:col-6">
        <MainCard title="Период оказания услуги"></MainCard>
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