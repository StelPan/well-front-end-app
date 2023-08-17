<script>
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";

import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Breadcrumb, MainCard, InputText, InputMask},
  setup() {
    const store = useStore();

    const breadcrumbs = ref([
      {label: 'Уведомления', router: {name: 'notices'}},
      {label: 'Создание уведомления'}
    ]);

    const roles = computed(() => store.getters.getRolesList);
    const typeNotices = computed(() => store.getters.getListTypeNotices);

    const form = reactive({
      type: '',
      send_date: '',
      send_time: '',
      send_now: false,
      senders_all_roles: false,
    })

    onMounted(async () => {
      await store.dispatch('fetchRoles');
      await store.dispatch('fetchTypeNotices');
    });

    return {breadcrumbs, roles, typeNotices, form};
  },
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <div class="flex">
        <Button label="Сохранить как черновик" class="btn-error-outlined font-light"/>
        <Button label="Запланировать отправку" class="btn-primary font-light ml-3"/>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4">
        <MainCard title="Выберите или создайте тип уведомления">
          <Dropdown
              v-model="form.type"
              :options="typeNotices"
              optionLabel="label"
              option-value="value"
              placeholder="Тип уведомления"
              class="w-full"/>
        </MainCard>
      </div>

      <div class="col-12 md:col-4">
        <MainCard title="Дата и время отправки">
          <div class="flex">
            <Calendar v-model="form.send_date" placeholder="Дата" showIcon class="w-full"/>

            <span class="p-input-icon-left p-float-label">
              <i class="pi pi-search cursor-pointer" />
              <InputMask id="time" v-model="form.send_time" mask="99:99" placeholder="12:00"/>
              <label for="time">Время</label>
            </span>
          </div>
        </MainCard>
      </div>

      <div class="col-12 md:col-4">
        <MainCard title="Получатели уведомления">
          <Dropdown
              v-model="formReactive.language"
              :options="languages"
              optionLabel="label"
              option-value="value"
              placeholder="Язык"
              class="w-full"/>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>