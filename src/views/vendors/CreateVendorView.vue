<script>
import {computed, defineComponent, reactive, ref, toRaw, watch} from "vue";
import {useVendor} from "@/hooks/vendor";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Tab from "@/components/tabs/Tab";
import FileUpload from "@/components/FileUpload";
import Breadcrumb from "@/components/Breadcrumb";
import MainCard from "@/components/cards/MainCard";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import ButtonFileUpload from "@/components/buttons/ButtonFileUpload.vue";
import VendorIndividualPersonForm from "@/components/forms/VendorIndividualPersonForm";
import VendorJuridicalPersonForm from "@/components/forms/VendorJuridicalPersonForm";


export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    Button, Tab, Breadcrumb, MainCard, FileUpload, ButtonFileUpload, InputText,
    ButtonSuccess, VendorIndividualPersonForm, VendorJuridicalPersonForm
  },

  setup() {
    const {
      selectFileMemory,
      file,
      form,
      v$,
      vip$,
      createVendor,
      isCreate: isCreated,
      deleteFileMemory,
    } = useVendor();

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

    const create = async () => {
      try {
        await createVendor(currentStep.value);
      } catch (e) {
        console.error(e);
      }
    };

    const validator = computed(() => {
      return currentStep.value === 'ul' ? v$ : vip$
    });

    watch([form, currentStep], () => {
      isCreated.value = false;
    });

    return {
      selectFileMemory, file, deleteFileMemory,
      form, tabSteps, currentStep,
      breadcrumbs, create, tabs,
      toggleTabHandler, validator,
      isCreated, v$, vip$
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <div class="flex">
        <ButtonSuccess v-if="isCreated" label="Реквизит создан"/>
        <Button v-else label="Создать реквизиты" class="btn-primary font-light ml-2" @click="create"/>
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

  <template v-if="currentStep === 'ul'">
    <VendorJuridicalPersonForm :form="form" :errors="v$"/>
  </template>

  <template v-if="currentStep === 'ip'">
    <VendorIndividualPersonForm :form="form" :errors="vip$"/>
  </template>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Банковские реквизиты в формате PDF">
          <div class="flex flex-column">
            <div class="grid" v-if="file">
              <div class="col-12 md:col-3 sm:col-6">
                <div class="file-vendor-card px-2 py-3 border-round-xl relative flex align-items-center">
                  <div class="flex">
                    <i class="pi pi-file-edit color-primary" style="font-size: 1rem"></i>
                    <span class="ml-5 text-xs">{{ file.objectURL }}</span>
                  </div>
                  <i
                      @click="deleteFileMemory(file)"
                      class="pi pi-times color-black-20 text-white cansel-button cursor-pointer ml-auto"
                      style="font-size: 1rem"
                  ></i>
                </div>
              </div>
            </div>

            <div class="grid">
              <div class="col-12">
                <div class="md:col-3:sm-col-6">
                  <ButtonFileUpload @chooseFiles="selectFileMemory" label="Загрузить реквизиты" :multiple="false" />
                </div>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Персональная скидка">
      <div class="grid">
        <div class="col-12 md:col-4">
          <span class="p-float-label w-full">
            <InputText
                v-model="form.discount"
                id="discount"
                class="w-full"
            />
            <label for="discount">Скидка  *</label>
          </span>
        </div>
      </div>
    </MainCard>
  </section>
</template>