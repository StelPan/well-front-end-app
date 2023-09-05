<script>
import {computed, defineComponent, ref, unref} from "vue";
import {useCounterparties} from "@/hooks/counterparties";
import {useFlat} from "@/hooks/flat";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ButtonSuccess from "@/components/buttons/ButtonSuccess.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import CounterpartyIndividualEntrepreneurForm from "@/components/forms/CounterpartyIndividualEntrepreneurForm.vue";
import CounterpartyIndividualPersonForm from "@/components/forms/CounterpartyIndividualPersonForm.vue";
import CounterpartyJuridicalPersonForm from "@/components/forms/CounterpartyJuridicalPersonForm.vue";
import ButtonFileUpload from "@/components/buttons/ButtonFileUpload.vue";
import MainCard from "@/components/cards/MainCard.vue";
import InputNumberPhone from "@/components/inputs/InputNumberPhone.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    InputNumberPhone,
    MainCard, ButtonFileUpload, Breadcrumb,
    Button,
    ButtonSuccess,
    CounterpartyJuridicalPersonForm,
    CounterpartyIndividualEntrepreneurForm,
    CounterpartyIndividualPersonForm,
    InputText,
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadCounterparty} = useCounterparties();
      await loadCounterparty(to.params.id);
    } catch (e) {
      console.error(e);
    }

    next();
  },
  setup(props) {
    const {
      ulv$, flv$, ipv$, form,
      computedRules, counterparty, isUpdate, files,
      destroyPhoto: destroy, updateCounterparty: update, destroyFileMemory, addFileMemory
    } = useCounterparties();

    const validators = ref({
      ['ul']: ulv$,
      ['fl']: flv$,
      ['ip']: ipv$,
    });

    const validator = computed(() => validators.value[counterparty.value.type]);

    form.value = useFlat(unref(counterparty));
    if (form.value.reg_date)
      form.value.reg_date = form.value.reg_date.split('.').reverse().join('/');
    if (form.value.ogrn_date)
      form.value.ogrn_date = form.value.ogrn_date.split('.').reverse().join('/');
    if (form.value.birth_date)
      form.value.birth_date = form.value.birth_date.split('.').reverse().join('/');
    if (form.value.ogrnip_date)
      form.value.ogrnip_date = form.value.ogrnip_date.split('.').reverse().join('/');
    if (form.value.passport_date)
      form.value.passport_date = form.value.passport_date.split('.').reverse().join('/');

    const destroyPhoto = async (photo) => {
      try {
        await destroy(counterparty.value.id, {
          uuid: photo.uuid
        });
      } catch (e) {
        console.error(e);
      }
    };

    const updateCounterparty = async () => {
      try {
        await update(counterparty.value.id, form);
      } catch (e) {
        console.log(e);
      }
    };

    const label = computed(() => {
      let label = '';
      const type = counterparty.value.type;
      if (type === 'fl') {
        const {first_name, last_name, patronymic} = counterparty.value.data;
        label = last_name + ' ' + first_name + ' ' + patronymic;
      } else if (type === 'ip') {
        const {first_name, last_name, patronymic} = counterparty.value.data;
        label = 'ИП' + ' ' + last_name + ' ' + first_name + ' ' + patronymic;
      } else if (type === 'ul') {
        label = counterparty.value.data.full_name;
      }

      return label;
    });
    const breadcrumbs = ref([
      {label: 'Контрагенты', router: {name: 'counterparties'}},
      {label: label}
    ]);

    const tabSteps = ref(new Map([
      ['ul', 'CounterpartyJuridicalPersonForm'],
      ['ip', 'CounterpartyIndividualPersonForm'],
      ['fl', 'CounterpartyIndividualEntrepreneurForm'],
    ]));

    return {
      counterparty,
      form, files,
      breadcrumbs,
      tabSteps,
      computedRules,
      validator,
      destroyPhoto,
      destroyFileMemory,
      updateCounterparty,
      addFileMemory,
      isUpdate,
      ulv$, flv$, ipv$,
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <ButtonSuccess v-if="isUpdate" label="Изменения сохранены"/>
      <Button class="btn-primary" v-if="!isUpdate" @click="updateCounterparty" label="Сохранить изменения"/>
    </div>
  </section>

  <template v-if="counterparty.type === 'ul'">
    <CounterpartyJuridicalPersonForm
        :errors="ulv$"
        :form="form"
    />
  </template>

  <template v-if="counterparty.type === 'ip'">
    <CounterpartyIndividualPersonForm
        :errors="ipv$"
        :form="form"
    />
  </template>

  <template v-if="counterparty.type === 'fl'">
    <CounterpartyIndividualEntrepreneurForm
        :errors="flv$"
        :form="form"
    />
  </template>

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
<!--                <span v-if="validator.bank.$validator.length" class="text-xs color-error">-->
<!--                  {{ validator.corr_account[0] }}-->
<!--                </span>-->
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
              <div class="grid">
                <div class="col-12 md:col-3 sm:col-6" v-for="(file, i) in counterparty.photos" :key="i">
                  <div class="file-vendor-card px-2 py-3 border-round-xl relative flex align-items-center">
                    <div class="flex">
                      <i class="pi pi-file-edit color-primary" style="font-size: 1rem"></i>
                      <span class="ml-5 text-xs">
                        {{ file.original_url.split('/')[file.original_url.split('/').length - 1] }}
                      </span>
                    </div>
                    <i
                        @click="() => destroyPhoto(file)"
                        class="pi pi-times color-black-20 text-white cansel-button cursor-pointer ml-auto"
                        style="font-size: 1rem"
                    ></i>
                  </div>
                </div>
                <div class="col-12 md:col-3 sm:col-6" v-for="(file, i) in files" :key="i">
                  <div class="file-vendor-card px-2 py-3 border-round-xl relative flex align-items-center">
                    <div class="flex">
                      <i class="pi pi-file-edit color-primary" style="font-size: 1rem"></i>
                      <span class="ml-5 text-xs">
                        {{ file.objectURL }}
                      </span>
                    </div>
                    <i
                        @click="() => destroyFileMemory(file)"
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