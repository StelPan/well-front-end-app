<script>
import {defineComponent, onMounted, ref, unref, watch, computed} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useTariff} from "@/hooks/tariff";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";

import ConfirmationModal from "@/components/modals/ConfirmationModal.vue";

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
  components: {Button, Breadcrumb, MainCard, InputText, Dropdown, Editor, ConfirmationModal, InputNumber, ButtonSuccess},
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadTariff, loadTypeTariffs} = useTariff();
      await loadTariff(to.params.id);
      await loadTypeTariffs();
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const route = useRoute();
    const router = useRouter()
    const store = useStore();
    const {form, tariff, typeTariffs, isUpdated, updateTariff, destroyTariff, v$} = useTariff();
    const {t} = useI18n();

    form.value = {...unref(tariff)};

    const visibleConfirmationModal = computed(() => store.getters.getConfirmationDestroyTariffModal);

    const breadcrumbs = ref([]);

    const changeConfirmationStateModal = () => {
      store.dispatch('changeStateModal', {
        type: 'confirmationDestroyTariffModal',
        bool: !visibleConfirmationModal.value
      });
    };

    const toggleUpdateTariff = async () => {
      try {
        await updateTariff(tariff.value.id, form.value);
      } catch (e) {
        console.error(e);
      }
    };

    const toggleDestroyTariff = async () => {
      try {
        await changeConfirmationStateModal();
        await destroyTariff(route.params.id);
        await router.push({name: 'tariffs-periods-list', params: {period: MONTHLY_TYPE}});
      } catch (e) {
        console.error(e);
      }
    };

    watch(tariff, () => {
      form.value = {...unref(tariff)};
      breadcrumbs.value = [
        {label: t('menu.tariffs'), router: {name: 'tariffs'}},
        {label: form.value.name_ru}
      ];
      isUpdated.value = false
    })

    onMounted(async () => {
      breadcrumbs.value = [
        {label: t('menu.tariffs'), router: {name: 'tariffs'}},
        {label: form.value.name_ru}
      ];
    });

    return {
      breadcrumbs,
      typeTariffs,
      form,
      TARIFF_NAMES,
      visibleConfirmationModal,
      changeConfirmationStateModal,
      toggleUpdateTariff,
      toggleDestroyTariff,
      isUpdated,
      t,
      v$
    };
  }
});
</script>

<template>
  <ConfirmationModal v-model:visible="visibleConfirmationModal">
    <template #header>
      {{ t('modals.tariff-destroy.header') }}
    </template>

    <template #default>
      <span>{{ t('modals.tariff-destroy.text') }}</span>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <Button :label="t('labels.cancel')" @click="changeConfirmationStateModal"
                class="btn-primary-outlined font-light w-12"/>
        <Button :label="t('labels.destroy')" @click="toggleDestroyTariff" class="btn-primary font-light ml-3 w-12"/>
      </div>
    </template>
  </ConfirmationModal>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <div class="flex">
        <ButtonSuccess v-if="isUpdated" :label="t('labels.changes-saved')" />
        <Button :if="!isUpdated" :label="t('labels.save-changes')" @click="toggleUpdateTariff" class="btn-primary font-light ml-2"/>
      </div>
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
                  v-model="form.name_ru"
                  id="name"
                  class="w-full"
                  :class="{'p-invalid': v$.name_ru.$errors.length}"
              />
              <label for="name">{{ t('card-names.name') }} *</label>
             </span>
              <span v-if="v$.name_ru.$errors.length" class="color-error text-xs">
                {{ v$.name_ru.$errors[0].$message }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" :title="t('card-names.type-tariff')">
          <div class="grid">
            <div class="col-12">
              <div class="grid flex-column gap-4">
                <Dropdown
                    v-model="form.period"
                    optionLabel="name"
                    optionValue="name"
                    :options="typeTariffs"
                    :placeholder="t('card-names.type-tariff')"
                    class="w-full">
                  <template #option="{ option }">
                    {{ TARIFF_NAMES[option.name] }}
                  </template>

                  <template #value="{ value }">
                    {{ TARIFF_NAMES[value] }}
                  </template>
                </Dropdown>

                <div>
                  <span v-if="form.period === 'monthly'" class="p-float-label w-full">
                    <InputNumber
                        v-model="form.daily_cost"
                        id="daily_cost"
                        class="w-full"
                    />
                    <label for="daily_cost">{{ t('labels.daily_cost') }} *</label>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" :title="t('card-names.tariff-cost')">
          <div class="grid">
            <div class="col-12">
             <span class="p-float-label w-full">
              <InputText
                  v-model="form.cost"
                  :class="{'p-invalid': v$.cost.$errors.length}"
                  class="w-full"
                  id="name"
              />
              <label for="name">{{ t('tables.tariffs.cost') }} *</label>
             </span>
              <span v-if="v$.cost.$errors.length" class="color-error text-xs">
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
        <MainCard :title="t('card-names.tariff-cost-description')">
          <div class="grid">
            <div class="col-12">
              <span class="text-xl font-bold">{{ t('labels.full-description') }}</span>
              <Editor v-model="form.description_ru" class="w-full"/>
            </div>
            <div class="col-12">
              <span class="text-xl font-bold">{{ t('labels.short-description') }}</span>
              <Editor
                  v-model="form.short_description_ru"
                  class="w-full p-invalid"
              />
              <span v-if="v$.short_description_ru.$errors.length" class="color-error text-xs">
                {{ v$.short_description_ru.$errors[0].$message }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-4">
    <div class="flex justify-content-end">
      <span class="color-error underline cursor-pointer" @click="changeConfirmationStateModal">
        {{ t('modals.tariff-destroy.header') }}
      </span>
    </div>
  </section>
</template>