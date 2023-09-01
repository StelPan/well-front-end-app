<script>
import {defineComponent} from "vue";
import {useTariff} from "@/hooks/tariff";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import ConfirmationModal from "@/components/modals/ConfirmationModal.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";

const DAILY_TYPE = 'daily';
const HOURLY_TYPE = 'hourly';
const MONTHLY_TYPE = 'monthly';

const TARIFF_NAMES = {
  [DAILY_TYPE]: 'Дневной',
  [HOURLY_TYPE]: 'Часовой',
  [MONTHLY_TYPE]: 'Долгосрочные',
};

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, InputText, Dropdown, Editor, Breadcrumb, MainCard, ConfirmationModal, ButtonSuccess},
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadTypeTariffs} = useTariff();
      await loadTypeTariffs();
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const {form, v$, toggleSetDefault, toggleCreateTariff, isCreated, typeTariffs} = useTariff();

    const breadcrumbs = [
      {label: 'Тарифы', router: {name: 'tariffs'}},
      {label: 'Создание тарифа'}
    ];

    return {
      TARIFF_NAMES,
      form,
      typeTariffs,
      breadcrumbs,
      toggleCreateTariff,
      isCreated,
      toggleSetDefault,
      v$,
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <Button v-if="!isCreated" label="Создать тариф" @click="toggleCreateTariff" class="btn-primary font-light"/>
      <ButtonSuccess v-if="isCreated" label="Тариф создан" @click="toggleSetDefault"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid h-max">
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Наименование тарифа">
          <div class="grid">
            <div class="col-12">
             <span class="p-float-label w-full">
              <InputText
                  :class="{'p-invalid': v$.name_ru.$errors.length}"
                  v-model="form.name_ru"
                  id="name"
                  class="w-full"
              />
              <label for="name">Имя *</label>
             </span>
              <span class="color-error text-xs" v-if="v$.name_ru.$errors.length">
                {{ v$.name_ru.$errors[0].$message }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Тип тарифа">
          <div class="grid">
            <div class="col-12">
              <Dropdown
                  v-model="form.period"
                  :class="{'p-invalid': v$.period.$errors.length}"
                  optionLabel="name_ru"
                  optionValue="name"
                  :options="typeTariffs"
                  placeholder="Тип тарифа"
                  class="w-full">
              </Dropdown>
              <span class="color-error text-xs" v-if="v$.period.$errors.length">
                {{ v$.period.$errors[0].$message }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Стоимость тарифа / платежа">
          <div class="grid">
            <div class="col-12">
             <span class="p-float-label w-full">
              <InputText
                  :class="{'p-invalid': v$.cost.$errors.length}"
                  v-model="form.cost"
                  id="name"
                  class="w-full"
              />
              <label for="name">Cтоимость, руб. *</label>
             </span>
              <span class="color-error text-xs" v-if="v$.cost.$errors.length">
                {{ v$.cost.$errors[0].$message }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard :styles="{'h-full': true}" title="Описание тарифа / платежа">
          <div class="grid">
            <div class="col-12">
              <div class="mb-1">
                <span class="text-xl font-bold">Полное описание</span>
              </div>

              <Editor v-model="form.description_ru" class="w-full"/>

              <span v-if="v$.description_ru.$errors.length" class="color-error text-xs">
                {{ v$.description_ru.$errors[0].$message }}}
              </span>
            </div>
            <div class="col-12">
              <div class="mb-1">
                <span class="text-xl font-bold">Краткое описание</span>
              </div>
              <Editor v-model="form.short_description_ru" class="w-full"/>

              <span v-if="v$.short_description_ru.$errors.length" class="color-error text-xs">
                {{ v$.short_description_ru.$errors[0].$message }}}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>