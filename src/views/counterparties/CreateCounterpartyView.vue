<script>
import {defineComponent, ref, computed} from "vue";
import {useCounterparties} from "@/hooks/counterparties";

import Button from "primevue/button";
import MainCard from "@/components/cards/MainCard";
import InputText from "primevue/inputtext";
import Breadcrumb from "@/components/Breadcrumb";
import Tab from "@/components/tabs/Tab";
import ButtonFileUpload from "@/components/buttons/ButtonFileUpload";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";

import CounterpartyJuridicalPersonForm from "@/components/forms/CounterpartyJuridicalPersonForm";
import CounterpartyIndividualPersonForm from "@/components/forms/CounterpartyIndividualPersonForm";
import CounterpartyIndividualEntrepreneurForm from "@/components/forms/CounterpartyIndividualEntrepreneurForm";
import InputNumberPhone from "@/components/inputs/InputNumberPhone.vue";

const JP = 'ul'; // Юр. лицо
const IP = 'fl'; // Физ. лицо
const IE = 'ip'; // ИП

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    InputNumberPhone,
    Button,
    ButtonFileUpload,
    ButtonSuccess,
    MainCard,
    InputText,
    Breadcrumb,
    Tab,
    CounterpartyIndividualEntrepreneurForm,
    CounterpartyIndividualPersonForm,
    CounterpartyJuridicalPersonForm
  },
  setup() {
    const {
      ulv$, ipv$, flv$,
      form,
      createCounterparty,
      files,
      addFileMemory,
      destroyFileMemory,
      isCreate,
    } = useCounterparties();

    const breadcrumbs = ref([
      {label: 'Контрагенты', router: {name: 'counterparties'}},
      {label: 'Создание контрагента'}
    ]);

    const tabSteps = ref(new Map([
      [JP, 'CounterpartyJuridicalPersonForm'],
      [IP, 'CounterpartyIndividualEntrepreneurForm'],
      [IE, 'CounterpartyIndividualPersonForm'],
    ]));

    const currentStep = ref('ip');

    const validators = ref({
      [JP]: ulv$,
      [IP]: flv$,
      [IE]: ipv$,
    });

    const validator = computed(() => validators.value[currentStep.value]);

    const toggleTabHandler = ({type}) => currentStep.value = type;

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

    const create = async () => {
      await createCounterparty();
    };

    return {
      isCreate,
      form,
      files,
      create,
      createCounterparty,
      addFileMemory,
      destroyFileMemory,
      breadcrumbs,
      tabs,
      tabSteps,
      toggleTabHandler,
      currentStep,
      validator,
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <ButtonSuccess v-if="isCreate" label="Контрагент создан" />
      <Button v-else @click="create" label="Создать контрагента" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid mb-2">
      <div class="col-12 md:col-3 sm:col-12">
        <MainCard title="Выберите тип контрагента">
          <Tab @toggleTab="toggleTabHandler" :default-tab-switch="{ type: currentStep }" :tabs="tabs"/>
        </MainCard>
      </div>
    </div>
  </section>

  <component :form="form" :errors="validator" :is="tabSteps.get(currentStep)"></component>

  <section class="py-2 mb-3">
    <div class="grid mb-2">
      <div class="col-12 md:col-8">
        <MainCard title="Банковские реквизиты">
          <div class="grid">
            <div class="col-12 md:col-6">
              <div class="grid gap-4 m-0 flex-column">
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="form.account"
                        id="checking_account"
                        class="w-full"
                    />
                    <label for="checking_account">Расчетный счет *</label>
                  </span>
                  <!--                  <span v-if="validator.account.$validator.length" class="text-xs color-error">-->
                  <!--                    {{ validator.account.$validator[0].$message }}-->
                  <!--                  </span>-->
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="form.bic"
                        id="bik"
                        class="w-full"
                    />
                    <label for="bik">БИК *</label>
                  </span>
                  <!--                  <span v-if="validator.bic.$validator.length" class="text-xs color-error">-->
                  <!--                    {{ validator.bic.$validator[0].$message }}-->
                  <!--                  </span>-->
                </div>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="grid gap-4 m-0 flex-column">
                <span class="p-float-label w-full">
                    <InputText
                        v-model="form.bank"
                        id="bik"
                        class="w-full"
                    />
                    <label for="bik">Наименования банка *</label>
                </span>
                <!--                <span v-if="validator.bank.$validator.length" class="text-xs color-error">-->
                <!--                  {{ validator.bank.$validator[0].$message }}-->
                <!--                </span>-->
                <span class="p-float-label w-full">
                    <InputText
                        v-model="form.corr_account"
                        id="correspondent_account"
                        class="w-full"
                    />
                    <label for="correspondent_account">Корр. счет *</label>
                </span>
              </div>
            </div>
          </div>
        </MainCard>
      </div>

      <div class="col-12 md:col-4">
        <MainCard title="Контактные данные">
          <div class="grid">
            <div class="col-12">
              <div class="grid gap-4 m-0 flex-column">
                <div>
                  <InputNumberPhone
                      v-model="form.phone"
                      :country="selectCountry?.name"
                      :classes="{'p-invalid': validator.phone.$errors.length}"
                      :phone-code="selectCountry?.phone_code ? selectCountry.phone_code : '+7'"
                      @toggleChangePhoneCode="changeVisible"
                  />
                  <span v-if="validator.phone.$errors.length" class="text-xs color-error">
                    {{ validator.phone.$errors[0].$message }}
                  </span>
                </div>
                <div class="w-full">
                  <span class="p-float-label w-full">
                    <InputText
                        v-model="form.email"
                        :class="{'p-invalid': validator.email.$errors.length}"
                        id="email"
                        class="w-full"
                    />
                    <label for="email">Электронная почта (для уведомлений бенефициару) *</label>
                  </span>
                  <span v-if="validator.email.$errors.length" class="text-xs color-error">
                   {{ validator.email.$errors[0].$message }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Файлы">
          <div class="grid">
            <div class="col-12">
              <div class="grid" v-if="files.length">
                <div class="col-12 md:col-3 sm:col-6" v-for="(file, i) in files" :key="i">
                  <div class="file-vendor-card px-2 py-3 border-round-xl relative flex align-items-center">
                    <div class="flex">
                      <i class="pi pi-file-edit color-primary" style="font-size: 1rem"></i>
                      <span class="ml-5 text-xs">{{ file.objectURL }}</span>
                    </div>
                    <i
                        @click="destroyFileMemory(file)"
                        class="pi pi-times color-black-20 text-white cansel-button cursor-pointer ml-auto"
                        style="font-size: 1rem"
                    ></i>
                  </div>
                </div>
              </div>
              <ButtonFileUpload @chooseFiles="addFileMemory" label="Добавить файл" :multiple="true"/>
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
                :class="{'p-invalid': validator.discount.$errors.length}"
                id="discount"
                class="w-full"
            />
            <label for="discount">Скидка  *</label>
          </span>
          <span v-if="validator.discount.$errors.length">
            {{ validator.discount.$errors[0].$message }}
          </span>
        </div>
      </div>
    </MainCard>
  </section>
</template>

<style scoped>

</style>