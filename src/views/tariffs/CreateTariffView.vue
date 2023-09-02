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
import {useI18n} from "vue-i18n";

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
    const {t} = useI18n();
    const {form, v$, toggleSetDefault, toggleCreateTariff, isCreated, typeTariffs} = useTariff();

    const breadcrumbs = [
      {label: t('menu.tariffs'), router: {name: 'tariffs'}},
      {label: t('headers.tariff-create')}
    ];

    return {
      t,
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
      <Button v-if="!isCreated" :label="t('labels.tariff-create')" @click="toggleCreateTariff" class="btn-primary font-light"/>
      <ButtonSuccess v-if="isCreated" :label="t('labels.tariff-created')" @click="toggleSetDefault"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid h-max">
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" :title="t('card-names.tariff-name')">
          <div class="grid">
            <div class="col-12">
             <span class="p-float-label w-full">
              <InputText
                  :class="{'p-invalid': v$.name_ru.$errors.length}"
                  v-model="form.name_ru"
                  id="name"
                  class="w-full"
              />
              <label for="name">{{ t('labels.name') }} *</label>
             </span>
              <span class="color-error text-xs" v-if="v$.name_ru.$errors.length">
                {{ v$.name_ru.$errors[0].$message }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" :title="t('labels.type-tariff')">
          <div class="grid">
            <div class="col-12">
              <Dropdown
                  v-model="form.period"
                  :class="{'p-invalid': v$.period.$errors.length}"
                  optionLabel="name_ru"
                  optionValue="name"
                  :options="typeTariffs"
                  :placeholder="t('placeholders.type-tariff')"
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
        <MainCard :title="t('card-names.tariff-cost')">
          <div class="grid">
            <div class="col-12">
             <span class="p-float-label w-full">
              <InputText
                  :class="{'p-invalid': v$.cost.$errors.length}"
                  v-model="form.cost"
                  id="name"
                  class="w-full"
              />
              <label for="name">{{ t('labels.cost') }} руб. *</label>
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
        <MainCard :styles="{'h-full': true}" :title="t('tariff-cost-description')">
          <div class="grid">
            <div class="col-12">
              <div class="mb-1">
                <span class="text-xl font-bold">{{ t('labels.full-description') }}</span>
              </div>

              <Editor v-model="form.description_ru" class="w-full"/>

              <span v-if="v$.description_ru.$errors.length" class="color-error text-xs">
                {{ v$.description_ru.$errors[0].$message }}}
              </span>
            </div>
            <div class="col-12">
              <div class="mb-1">
                <span class="text-xl font-bold">{{ t('labels.short-description') }}</span>
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