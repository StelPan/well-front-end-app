<script>
import {computed, defineComponent, onMounted, reactive, ref, toRaw, watch} from "vue";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import Editor from "primevue/editor";
import MultiSelect from "primevue/multiselect";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import ConfirmationModal from "@/components/modals/ConfirmationModal.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    Breadcrumb, MainCard, InputText,
    InputMask, Dropdown, Calendar,
    Checkbox, MultiSelect, Button,
    Editor, ConfirmationModal, ButtonSuccess
  },
  setup() {
    const store = useStore();
    const errors = useError();

    const breadcrumbs = ref([
      {label: 'Уведомления', router: {name: 'notices'}},
      {label: 'Создание уведомления'}
    ]);

    const isSaveDraft = ref(false);
    const isSave = ref(false);

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

    watch(form, () => {
      isSaveDraft.value = false;
      isSave.value = false;
      errors.clearErrors();
    });

    const noticeTypeForm = reactive({
      name: ''
    });

    const visibleConfirmationModal = computed(() => store.getters.getCreateTypeNoticeModal);
    const changeVisible = () => store.dispatch('changeStateModal', {
      type: 'createTypeNoticeModal',
      bool: !visibleConfirmationModal.value
    });

    const createTypeNotice = async () => {
      await store.dispatch('fetchCreateTypeNotice', noticeTypeForm);
      await store.dispatch('fetchTypeNotices');
      await changeVisible();
    };

    const createNotice = async () => {
      try {
        const date = toRaw(form.send_date) instanceof Date ? new Date(form.send_date) : false;
        const send_date = date ?
            `${date.getDate()}.${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}`
            : '';

        const formatterForm = {
          ...form,
          send_date
        };
        await store.dispatch('fetchCreateNotice', formatterForm);
        isSave.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    const saveAsDraft = async () => {
      try {
        const {push_type_id, text, title, roles} = form;
        const formatterForm = {push_type_id, text, title, roles, send_now: 0};
        await store.dispatch('fetchCreateNotice', formatterForm);
        isSaveDraft.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
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
        });

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
      saveAsDraft,
      isSaveDraft,
      isSave,
      errors: errors.errors
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
        <template v-if="!isSave">
          <ButtonSuccess v-if="isSaveDraft" label="Черновик сохранен"/>
          <Button @click="saveAsDraft" label="Сохранить как черновик" class="btn-error-outlined font-light ml-2"/>
          <Button @click="createNotice" label="Запланировать отправку" class="btn-primary font-light ml-2"/>
        </template>
        <template v-if="isSave">
          <ButtonSuccess label="Уведомление создано" />
        </template>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Наименование уведомления">
          <span class="p-float-label w-full">
            <InputText v-model="form.title" id="name" class="w-full" :class="{'p-invalid': errors.title}"/>
            <label for="name">Наименование</label>
          </span>
          <span v-if="errors.title" class="text-xs color-error">
            {{ errors.title[0] }}
          </span>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Выберите или создайте тип уведомления">
          <div class="w-full">
            <Dropdown
                v-model="form.push_type_id"
                :class="{'p-invalid': errors.push_type_id}"
                :options="typeNotices"
                optionLabel="name"
                option-value="id"
                placeholder="Тип уведомления"
                class="w-full mb-2"/>
            <span v-if="errors.push_type_id" class="text-xs color-error">
              {{ errors.push_type_id[0] }}
            </span>
          </div>

          <span @click="changeVisible" class="color-primary underline cursor-pointer">
            Создать новый тип уведомления
          </span>
        </MainCard>
      </div>

      <div class="col-12 md:col-4">
        <MainCard title="Дата и время отправки">
          <div class="grid">
            <div class="col-12 md:col-6">
              <Calendar
                  v-model="form.send_date"
                  :class="{'p-invalid': errors.send_date}"
                  date-format="d.m.yy"
                  placeholder="Дата"
                  showIcon
                  class="w-full"
              />
              <span v-if="errors.send_date" class="text-xs color-error">
                {{ errors.send_date[0] }}
              </span>
            </div>
            <div class="col-12 md:col-6">
              <div class="w-full">
                <span class="p-input-icon-left p-float-label w-full">
                  <i class="pi pi-search"/>
                  <InputMask id="time" v-model="form.send_time" class="w-full" mask="99:99" placeholder="12:00"/>
                  <label for="time">Время</label>
                </span>
                <span v-if="errors.send_time" class="text-xs color-error">
                  {{ errors.send_time[0] }}
                </span>
              </div>
            </div>
          </div>

          <Checkbox v-model="form.send_now" :binary="true" name="send_now" id="send_now"/>
          <label for="send_now" class="ml-1">Отправить немедленно</label>
        </MainCard>
      </div>

      <div class="col-12 md:col-4">
        <MainCard title="Получатели уведомления">
          <div class="w-full">
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
            <span v-if="errors.roles" class="text-xs color-error">
              {{ errors.roles[0] }}
            </span>
          </div>

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
          <span class="text-xs color-error" v-if="errors.text">
            {{ errors.text[0] }}
          </span>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>