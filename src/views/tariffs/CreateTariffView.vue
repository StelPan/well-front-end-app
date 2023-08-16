<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
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
  components: {Button, InputText, Dropdown, Editor, Breadcrumb, MainCard, ConfirmationModal},
  setup() {
    const store = useStore();

    const form = ref({
      name_ru: '',
      description_ru: '',
      short_description_ru: '',
      period: '',
      cost: '',
    });

    const typeTariffs = computed(() => store.getters.getListTypeTariffs);

    const breadcrumbs = [{label: 'Тарифы', router: {name: 'tariffs'}}, {label: 'Создание тарифа'}];

    const toggleCreateTariff = async () => {
      await store.dispatch('fetchCreateTariff', form.value);
    }

    onMounted(async () => {
      await store.dispatch('fetchTypeTariffs');
    })

    return {TARIFF_NAMES, form, typeTariffs, breadcrumbs, toggleCreateTariff};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <Button label="Создать тариф" @click="toggleCreateTariff" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4">
        <MainCard title="Наименование тарифа">
          <div class="grid">
            <div class="col-12">
             <span class="p-float-label w-full">
              <InputText v-model="form.name_ru" id="name" class="w-full"/>
              <label for="name">Имя *</label>
             </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Тип тарифа">
          <div class="grid">
            <div class="col-12">
              <Dropdown
                  v-model="form.period"
                  optionLabel="name"
                  optionValue="name"
                  :options="typeTariffs"
                  placeholder="Тип тарифа"
                  class="w-full">
                <template #option="{ option }">
                  {{ TARIFF_NAMES[option.name] }}
                </template>

                <template #value="{ value }">
                  {{ TARIFF_NAMES[value] }}
                </template>
              </Dropdown>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Стоимость тарифа / платежа">
          <div class="grid">
            <div class="col-12">
             <span class="p-float-label w-full">
              <InputText v-model="form.cost" id="name" class="w-full"/>
              <label for="name">Cтоимость, руб. *</label>
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
        <MainCard title="Описание тарифа / платежа">
          <div class="grid">
            <div class="col-12">
              <span>Полное описание</span>
              <Editor v-model="form.description_ru" class="w-full" />
            </div>
            <div class="col-12">
              <span>Краткое описание</span>
              <Editor v-model="form.short_description_ru" class="w-full" />
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>