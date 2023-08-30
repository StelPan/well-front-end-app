<script>
import {defineComponent, reactive, ref, toRaw, watch} from "vue";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";
import {useFlat} from "@/hooks/flat";
import {useDates} from "@/hooks/dates";

import Button from "primevue/button";
import Tab from "@/components/tabs/Tab";
import FileUpload from "@/components/FileUpload";
import Breadcrumb from "@/components/Breadcrumb";
import MainCard from "@/components/cards/MainCard";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import VendorIndividualPersonForm from "@/components/forms/VendorIndividualPersonForm";
import VendorJuridicalPersonForm from "@/components/forms/VendorJuridicalPersonForm";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    Button, Tab, Breadcrumb, MainCard, FileUpload,
    ButtonSuccess, VendorIndividualPersonForm, VendorJuridicalPersonForm
  },
  setup() {
    const store = useStore();
    const errors = useError();
    const dates = useDates();

    const formData = reactive({
      data: {
        full_name: '', short_name: '', legal_form: '',
        ogrn: '', orgn_date: '', ogrn_plaсe: '', reg_date: '',
        kpp: '', oktmo: '', ogrn_ip: '', ogrnip_date: '', ogrnip_place: ''
      },
      inn: '', postcode: '', region: '', city: '', street: '', house: '', building: '', corps: '', floor: '', room: '',
      post_code: '', region_fact: '', city_fact: '', street_fact: '', house_fact: '', building_fact: '', corps_fact: '',
      floor_fact: '', room_fact: '', account: '', bic: '', corr_account: '', bank: '', phone: '', email: '', snils: ''
    });

    const file = ref(false);
    const fileUploader = ref();
    const isCreated = ref(false);

    const breadcrumbs = ref([
      {label: 'Реквизиты', router: '/vendors/list'},
      {label: 'Создание реквизитов'}
    ]);

    const tabs = ref([{
      label: 'Юр.лицо',
      type: 'ul'
    }, {
      label: 'Ип',
      type: 'ip',
    }]);

    const tabSteps = ref(new Map([
      ['ul', 'VendorJuridicalPersonForm'],
      ['ip', 'VendorIndividualPersonForm'],
    ]));

    const currentStep = ref('ul');

    const toggleTabHandler = ({type}) => currentStep.value = type;

    watch([formData, currentStep], () => {
      errors.clearErrors();
      isCreated.value = false;
    });

    const uploadRequests = ({files}) => {
      file.value = files;
    };

    const fileUpload = async (id, body) => {
      await store.dispatch('fetchUploadVendorPayment', {id, body});
    };

    const fileDestroyServer = async (id) => {
      await store.dispatch('fetchDestroyVendorPayment', id);
    };

    const fileDestroyLocal = async () => {
      file.value = false;
    };

    const createVendor = async () => {
      try {
        const data = new FormData();
        const type = currentStep.value;
        const merge = {type, ...useFlat(formData)};

        for (let key in merge) {
          if (toRaw(merge[key]).constructor.name === Date.name) {
            data.set(key, dates.correctDate(toRaw(merge[key])));
            continue;
          }

          data.set(key, merge[key]);
        }

        await store.dispatch('fetchCreateVendor', data);

        isCreated.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    return {
      formData, tabSteps, currentStep,
      breadcrumbs, createVendor, tabs, file,
      toggleTabHandler, uploadRequests, errors: errors.errors,
      fileDestroyLocal, fileUploader, isCreated
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <div class="flex">
        <ButtonSuccess label="Реквизит создан" />
        <Button label="Создать реквизиты" class="btn-primary font-light ml-2" @click="createVendor"/>
      </div>
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Выберите тип">
          <Tab @toggleTab="toggleTabHandler" :default-tab-switch="{ type: currentStep }" :tabs="tabs"/>
        </MainCard>
      </div>
    </div>
  </section>

  <component :errors="errors" :form="formData" :is="tabSteps.get(currentStep)"></component>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Банковские реквизиты в формате PDF">
          <div v-if="file" class="grid">
            <div class="col-12 md:col-4">
              <div class="h-3em mb-2 border-round border-1">
                <div class="grid">
                  <div class="col-2 flex justify-content-center align-items-center">
                    <i class="pi pi-file-pdf"></i>
                  </div>
                  <div class="col-8">
                    <span>{{ file.name }}</span>
                  </div>
                  <div class="col-2">
                    <i @click="fileDestroyLocal" class="pi pi-times cursor-pointer" style="font-size: 1.5rem"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-content-start">
            <Button
                @click="console.log(fileUploader._.components.FileUpload.data)"
                class="btn-primary"
            >Загрузить реквизиты
            </Button>
            <FileUpload
                ref="fileUploader"
                accept="image/*"
                @selected="uploadRequests"
                :label="file ? 'Изменить реквизиты' : 'Загрузить реквизиты'"
                :multiple="false"
            />
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>