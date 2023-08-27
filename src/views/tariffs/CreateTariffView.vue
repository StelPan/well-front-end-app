<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";

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
  setup() {
    const store = useStore();
    const errors = useError();

    const form = reactive({
      name_ru: '',
      description_ru: '',
      short_description_ru: '',
      period: '',
      cost: '',
    });

    const isCreated = ref(false);

    watch(
        form,
        () => errors.clearErrors()
    )

    const typeTariffs = computed(() => {
      const tariffs = store.getters.getListTypeTariffs;
      return tariffs.map(tariff => {
        return {...tariff, name_ru: TARIFF_NAMES[tariff.name]}
      });
    });

    const breadcrumbs = [{label: 'Тарифы', router: {name: 'tariffs'}}, {label: 'Создание тарифа'}];

    const toggleCreateTariff = async () => {
      try {
        await store.dispatch('fetchCreateTariff', form);
        isCreated.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    const toggleSetDefault = () => {
      isCreated.value = false;
      for (let key in form) {
        form[key] = ""
      }
    };

    onMounted(async () => {
      await store.dispatch('fetchTypeTariffs');
    });

    return {
      TARIFF_NAMES,
      form,
      typeTariffs,
      breadcrumbs,
      toggleCreateTariff,
      errors: errors.errors,
      isCreated,
      toggleSetDefault
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <Button v-if="!isCreated" label="Создать тариф" @click="toggleCreateTariff" class="btn-primary font-light"/>
      <ButtonSuccess v-if="isCreated" label="Тариф создан" @click="toggleSetDefault" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid h-max">
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Наименование тарифа">
          <div class="grid">
            <div class="col-12">
             <span class="p-float-label w-full">
              <InputText v-model="form.name_ru" id="name" class="w-full" :class="{'p-invalid': !!errors?.name_ru}"/>
              <label for="name">Имя *</label>
             </span>
              <span class="color-error" v-if="errors?.name_ru">
                <template v-for="(error, i) in errors.name_ru" :key="i">
                  {{ error }} <br>
                </template>
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
                  optionLabel="name_ru"
                  optionValue="name"
                  :options="typeTariffs"
                  placeholder="Тип тарифа"
                  class="w-full">
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
              <InputText v-model="form.cost" id="name" class="w-full" :class="{'p-invalid': !!errors?.cost}"/>
              <label for="name">Cтоимость, руб. *</label>
             </span>
              <span class="color-error" v-if="errors?.cost">
                <template v-for="(error, i) in errors.cost" :key="i">
                  {{ error }} <br>
                </template>
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

              <span v-if="errors.description_ru" :class="{'color-error': errors.description_ru }">
                {{ errors.description_ru[0] }}
              </span>
            </div>
            <div class="col-12">
              <div class="mb-1">
                <span class="text-xl font-bold">Краткое описание</span>
              </div>
              <Editor v-model="form.short_description_ru" class="w-full"/>

              <span v-if="errors.short_description_ru" :class="{'color-error': errors.short_description_ru }">
                {{ errors.short_description_ru[0] }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>