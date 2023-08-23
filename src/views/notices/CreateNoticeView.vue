<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import Editor from "primevue/editor";
import MultiSelect from "primevue/multiselect";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import ConfirmationModal from "@/components/modals/ConfirmationModal.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    Breadcrumb, MainCard, InputText,
    InputMask, Dropdown, Calendar,
    Checkbox, MultiSelect, Button,
    Editor, ConfirmationModal,
  },
  setup() {
    const store = useStore();

    const breadcrumbs = ref([
      {label: 'Уведомления', router: {name: 'notices'}},
      {label: 'Создание уведомления'}
    ]);

    const roles = computed(() => store.getters.getRolesList);
    const typeNotices = computed(() => store.getters.getListTypeNotices);

    const form = reactive({
      push_type_id: '',
      send_date: '',
      send_time: '',
      send_now: 0,
      senders_all_roles: 0,
      text: '',
      title: '',
      roles: []
    });

    const noticeTypeForm = reactive({
      name: ''
    });

    const visibleConfirmationModal = computed(() => store.getters.getConfirmationStateModal);
    const changeVisible = () => store.dispatch('changeStateModal', {
      type: 'confirmationStateModal',
      bool: !visibleConfirmationModal.value
    });

    const createTypeNotice = async () => {
      await store.dispatch('fetchCreateTypeNotice', noticeTypeForm);
      await store.dispatch('fetchTypeNotices');
      await changeVisible();
    };

    const createNotice = async () => {
      try {
        const date = form.send_date.length ? new Date(form.send_date) : false;
        const formatterForm = {
          ...form,
          send_date: date ? `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}` : '',
        }
        await store.dispatch('fetchCreateNotice', formatterForm);
      } catch (e) {
        console.error(e);
      }
    };

    watch(
        () => form.senders_all_roles,
        (val) => {
          if (val) {
            form.roles = roles.value.map(role => role.id);
          } else {
            form.roles = [];
          }
        })

    onMounted(async () => {
      await store.dispatch('fetchRoles');
      await store.dispatch('fetchTypeNotices');
    });

    return {
      breadcrumbs,
      roles,
      typeNotices,
      form,
      noticeTypeForm,
      visibleConfirmationModal,
      changeVisible,
      createTypeNotice,
      createNotice,
    };
  },
});
</script>

<template>
  <ConfirmationModal :visible="visibleConfirmationModal">
    <template #header>
      Создание типа уведомления
    </template>

    <template #default>
      <span class="p-float-label w-full">
          <InputText v-model="noticeTypeForm.name" id="name" class="w-full"/>
          <label for="name">Название типа</label>
      </span>
    </template>

    <template #footer>
      <div class="flex">
        <Button @click="changeVisible" label="Отмена" class="btn-error-outlined font-light"/>
        <Button @click="createTypeNotice" label="Создать тип" class="btn-primary font-light ml-3"/>
      </div>
    </template>
  </ConfirmationModal>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <div class="flex">
        <Button label="Сохранить как черновик" class="btn-error-outlined font-light"/>
        <Button @click="createNotice" label="Запланировать отправку" class="btn-primary font-light ml-3"/>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Наименование уведомления">
          <span class="p-float-label w-full">
              <InputText v-model="form.title" id="name" class="w-full"/>
              <label for="name">Наименование</label>
          </span>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Выберите или создайте тип уведомления">
          <Dropdown
              v-model="form.push_type_id"
              :options="typeNotices"
              optionLabel="name"
              option-value="id"
              placeholder="Тип уведомления"
              class="w-full mb-2"/>

          <span @click="changeVisible" class="color-primary underline cursor-pointer">
            Создать новый тип уведомления
          </span>
        </MainCard>
      </div>

      <div class="col-12 md:col-4">
        <MainCard title="Дата и время отправки">
          <div class="grid">
            <div class="col-12 md:col-6">
              <Calendar v-model="form.send_date" date-format="d.m.yy" placeholder="Дата" showIcon class="w-full"/>
            </div>
            <div class="col-12 md:col-6">
            <span class="p-input-icon-left p-float-label w-full">
              <i class="pi pi-search"/>
              <InputMask id="time" v-model="form.send_time" class="w-full" mask="99:99" placeholder="12:00"/>
              <label for="time">Время</label>
            </span>
            </div>
          </div>

          <Checkbox v-model="form.send_now" :binary="true" name="send_now" id="send_now"/>
          <label for="send_now" class="ml-1">Отправить немедленно</label>
        </MainCard>
      </div>

      <div class="col-12 md:col-4">
        <MainCard title="Получатели уведомления">
          <MultiSelect
              v-model="form.roles"
              display="chip"
              :options="roles"
              optionLabel="name_ru"
              option-value="id"
              placeholder="Выберите получателя"
              class="w-full mb-2"
              :disabled="!!form.senders_all_roles"
          />

          <Checkbox v-model="form.senders_all_roles" :binary="true" name="senders_all_roles" id="senders_all_roles"/>
          <label for="senders_all_roles" class="ml-1">Получатели - все роли</label>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Текст уведомления">
          <Editor v-model="form.text" class="w-full"/>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>