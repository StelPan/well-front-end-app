<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {useCreateReactiveCopy} from "../../hooks/useCreateReactiveCopy";

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

    const form = reactive({
      short_description_ru: '',
      description_ru: '',
      name_ru: '',
      period: '',
      cost: '',
    });

    const tariff = computed(() => store.getters.getCurrentTariff);
    const typeTariffs = computed(() => store.getters.getListTypeTariffs);
    const breadcrumbs = ref([]);

    const visibleConfirmationModal = computed(() => store.getters.getConfirmationStateModal);

    const changeConfirmationStateModal = () => {
      store.dispatch('changeStateModal', {
        type: 'confirmationStateModal',
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
        console.error(e.response);
      }
    };

    const toggleDestroyTariff = async () => {
      try {
        // TODO: DELETE TARIFF
        await changeConfirmationStateModal();
        await router.push({name: 'tariffs-periods-list', params: {period: MONTHLY_TYPE}});
      } catch (e) {
        console.error(e);
      }
    }

    onMounted(async () => {
      await store.dispatch('fetchTariff', route.params.id);
      await store.dispatch('fetchTypeTariffs');
      useCreateReactiveCopy(form, tariff.value);

      breadcrumbs.value = [{label: 'Тарифы', router: {name: 'tariffs'}}, {label: tariff.value.name_ru}];
    })

    return {
      breadcrumbs,
      typeTariffs,
      form,
      TARIFF_NAMES,
      visibleConfirmationModal,
      changeConfirmationStateModal,
      toggleUpdateTariff,
      toggleDestroyTariff
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
        <Button label="Отменить" @click="changeConfirmationStateModal" class="btn-primary-outlined font-light w-12" />
        <Button label="Удалить" @click="toggleDestroyTariff" class="btn-primary font-light ml-3 w-12" />
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