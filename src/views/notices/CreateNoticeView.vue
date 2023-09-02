<script>
import {computed, defineComponent, onMounted, reactive, ref, toRaw, watch} from "vue";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";
import {useRoles} from "@/hooks/role";
import {useNotices} from "@/hooks/notices";

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
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadRoles} = useRoles();
      const {loadTypeNotices} = useNotices();
      await Promise.all([loadTypeNotices(), loadRoles()]);
    } catch (e) {
      console.error(e);
    }

    next();
  },
  setup() {
    const store = useStore();
    const errors = useError();
    const {roles} = useRoles();
    const {
      isCreate,
      typeNotices,
      formCreateNotice: form,
      createNotice: create,
      createNoticeAsDraft,
      v$
    } = useNotices();

    const breadcrumbs = ref([
      {label: 'Уведомления', router: {name: 'notices'}},
      {label: 'Создание уведомления'}
    ]);

    const isSaveDraft = ref(false);

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
        await create();
      } catch (e) {
        console.error(e);
      }
    }

    const saveAsDraft = async () => {
      try {
        await createNoticeAsDraft();
        isSaveDraft.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    return {
      v$,
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
      isCreate,
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
        <template v-if="!isCreate">
          <ButtonSuccess v-if="isSaveDraft" label="Черновик сохранен"/>
          <Button @click="saveAsDraft" label="Сохранить как черновик" class="btn-black-20-outlined font-light ml-2"/>
          <Button @click="createNotice" label="Запланировать отправку" class="btn-primary font-light ml-2"/>
        </template>
        <template v-if="isCreate">
          <ButtonSuccess label="Уведомление создано"/>
        </template>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Наименование уведомления">
          <span class="p-float-label w-full">
            <InputText
                v-model="form.title"
                id="name"
                class="w-full"
                :class="{'p-invalid': v$.title.$errors.length}"
            />
            <label for="name">Наименование</label>
          </span>
          <span v-if="v$.title.$errors.length" class="text-xs color-error">
            {{ v$.title.$errors[0].$message }}
          </span>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Выберите или создайте тип уведомления">
          <div class="w-full mb-2">
            <Dropdown
                v-model="form.push_type_id"
                :class="{'p-invalid': v$.push_type_id.$errors.length}"
                :options="typeNotices"
                optionLabel="name"
                option-value="id"
                placeholder="Тип уведомления"
                class="w-full"/>
            <span v-if="v$.push_type_id.$errors.length" class="text-xs color-error">
              {{ v$.push_type_id.$errors[0].$message }}
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
          <div class="w-full mb-2">
            <MultiSelect
                v-model="form.roles"
                :class="{'p-invalid': v$.roles.$errors.length}"
                display="chip"
                :options="roles"
                optionLabel="name_ru"
                option-value="id"
                placeholder="Выберите получателя"
                class="w-full"
                :disabled="!!form.senders_all_roles"
            />
            <span v-if="v$.roles.$errors.length" class="text-xs color-error">
              {{ v$.roles.$errors[0].$message }}
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
          <span class="text-xs color-error" v-if="v$.text.$errors.length">
            {{ v$.text.$errors[0].$message }}
          </span>
        </MainCard>
      </div>
    </div>
  </section>
</template>