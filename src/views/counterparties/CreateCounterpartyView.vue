<script>
import {defineComponent, ref, reactive} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import Button from "primevue/button";
import MainCard from "@/components/cards/MainCard";
import InputText from "primevue/inputtext";
import Breadcrumb from "@/components/Breadcrumb";
import Tab from "@/components/tabs/Tab";

import CounterpartyJuridicalPersonForm from "@/components/forms/CounterpartyJuridicalPersonForm";
import CounterpartyIndividualPersonForm from "@/components/forms/CounterpartyIndividualPersonForm";
import CounterpartyIndividualEntrepreneurForm from "@/components/forms/CounterpartyIndividualEntrepreneurForm";

const JP = 'JP'; // Юр. лицо
const IP = 'IP'; // Физ. лицо
const IE = 'IE'; // ИП

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    Button,
    MainCard,
    InputText,
    Breadcrumb,
    Tab,
    CounterpartyIndividualEntrepreneurForm,
    CounterpartyIndividualPersonForm,
    CounterpartyJuridicalPersonForm
  },
  setup() {
    const formReactive = reactive({});

    const breadcrumbs = ref([{
      label: 'Контрагенты',
      router: {name: 'counterparties'}
    }, {
      label: 'Создание контрагента'
    }]);

    const tabSteps = ref(new Map([
        [JP, 'CounterpartyJuridicalPersonForm'],
        [IP, 'CounterpartyIndividualPersonForm'],
        [IE, 'CounterpartyIndividualEntrepreneurForm'],
    ]));

    const currentStep = ref(IP);

    const toggleTabHandler = ({ type }) => currentStep.value = type;

    const tabs = ref([{
      label: 'Юр.лицо',
      type: JP
    }, {
      label: 'Ип',
      type: IE,
    }, {
      label: 'Физ.лицо',
      type: IP,
    }]);

    return {
      formReactive,
      breadcrumbs,
      tabs,
      tabSteps,
      toggleTabHandler,
      currentStep
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />
      <Button label="Создать контрагента" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid mb-2">
      <div class="col-12 md:col-3 sm:col-6">
        <MainCard title="Выберите тип контрагента">
          <Tab @toggleTab="toggleTabHandler" :default-tab-switch="{ type: currentStep }" :tabs="tabs" />
        </MainCard>
      </div>
    </div>
  </section>

  <component :is="tabSteps.get(currentStep)"></component>
</template>

<style scoped>

</style>