<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";
import {useError} from "@/hooks/useErrors";

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
  components: {Button, Breadcrumb, MainCard, InputText, Dropdown, Editor, ConfirmationModal},
  setup() {
    const route = useRoute();
    const router = useRouter()
    const store = useStore();
    const errors = useError();

    const form = reactive({
      short_description_ru: '',
      description_ru: '',
      name_ru: '',
      period: '',
      cost: '',
      daily_cost: ''
    });

    const visibleConfirmationModal = computed(() => store.getters.getConfirmationDestroyTariffModal);
    const tariff = computed(() => store.getters.getCurrentTariff);
    const typeTariffs = computed(() => {
      const tariffs = store.getters.getListTypeTariffs;
      return tariffs.map(tariff => {
        return {...tariff, name_ru: TARIFF_NAMES[tariff.name]}
      });
    });

    const breadcrumbs = ref([]);

    const changeConfirmationStateModal = () => {
      store.dispatch('changeStateModal', {
        type: 'confirmationDestroyTariffModal',
        bool: !visibleConfirmationModal.value
      });
    };

    const toggleUpdateTariff = async () => {
      try {
        await store.dispatch('fetchUpdateTariff', {
          id: route.params.id,
          body: form
        });
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    const toggleDestroyTariff = async () => {
      try {
        // TODO: DELETE TARIFF
        await store.dispatch('fetchDestroyTariff', route.params.id);
        await changeConfirmationStateModal();
        await router.push({name: 'tariffs-periods-list', params: {period: MONTHLY_TYPE}});
      } catch (e) {
        console.error(e);
      }
    };

    watch(form, () => errors.clearErrors());

    onMounted(async () => {
      await store.dispatch('fetchTariff', route.params.id);
      await store.dispatch('fetchTypeTariffs');
      useCreateReactiveCopy(form, tariff.value);

      breadcrumbs.value = [
        {label: 'Тарифы', router: {name: 'tariffs'}},
        {label: tariff.value.name_ru}
      ];
    });

    watch(form, () => errors.clearErrors());

    return {
      breadcrumbs,
      typeTariffs,
      form,
      TARIFF_NAMES,
      visibleConfirmationModal,
      changeConfirmationStateModal,
      toggleUpdateTariff,
      toggleDestroyTariff,
      errors: errors.errors
    };
  }
});
</script>

<template>
  <ConfirmationModal v-model:visible="visibleConfirmationModal">
    <template #header>
      Удалить тариф
    </template>

    <template #default>
      <span>Вы уверены, что хотите удалить тариф? Это действие будет невозможно отменить</span>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Отменить" @click="changeConfirmationStateModal" class="btn-primary-outlined font-light w-12"/>
        <Button label="Удалить" @click="toggleDestroyTariff" class="btn-primary font-light ml-3 w-12"/>
      </div>
    </template>
  </ConfirmationModal>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <Button label="Сохранить изменения" @click="toggleUpdateTariff" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid h-max">
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Наименование тарифа">
          <div class="grid">
            <div class="col-12">
             <span class="p-float-label w-full">
              <InputText v-model="form.name_ru" id="name" class="w-full" :class="{'p-invalid': errors.name_ru}"/>
              <label for="name">Имя *</label>
             </span>
              <span v-if="errors.name_ru" class="color-error text-xs">
                {{ errors.name_ru[0] }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Тип тарифа">
          <div class="grid">
            <div class="col-12">
              <div class="grid flex-column gap-4">
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

                <div>
                  <span v-if="form.period === 'monthly'" class="p-float-label w-full">
                    <InputText
                        v-model="form.daily_cost"
                        id="daily_costname"
                        :class="{'p-invalid': errors.daily_cost}"
                        class="w-full"
                    />
                    <label for="name">Суточная стоимость *</label>
                  </span>
                  <span v-if="errors.daily_cost" class="text-xs color-error">
                    {{ errors.daily_cost[0] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Стоимость тарифа / платежа">
          <div class="grid">
            <div class="col-12">
             <span class="p-float-label w-full">
              <InputText v-model="form.cost" id="name" class="w-full" :class="{'p-invalid': errors.cost}"/>
              <label for="name">Cтоимость, руб. *</label>
             </span>
              <span v-if="errors.cost" class="color-error text-xs">
                {{ errors.cost[0] }}
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
              <span class="text-xl font-bold">Полное описание</span>
              <Editor v-model="form.description_ru" class="w-full"/>
            </div>
            <div class="col-12">
              <span class="text-xl font-bold">Краткое описание</span>
              <Editor
                  v-model="form.short_description_ru"
                  class="w-full p-invalid"
              />
              <span v-if="errors.short_description_ru" :class="{'color-error': errors.short_description_ru }">
                {{ errors.short_description_ru[0] }}
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
        Удалить тариф
      </span>
    </div>
  </section>
</template>


<style scoped>

</style>