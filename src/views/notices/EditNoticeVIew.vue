<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {useError} from "@/hooks/useErrors";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import InputMask from "primevue/inputmask";
import Breadcrumb from "@/components/Breadcrumb.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import MainCard from "@/components/cards/MainCard";
import Editor from "primevue/editor";
import MultiSelect from "primevue/multiselect";

export default defineComponent({
  layout: {name: "AdminLayout"},
  components: {
    Breadcrumb, Button, InputText,
    ButtonSuccess, MainCard, Checkbox,
    MultiSelect, Editor, Dropdown,
    Calendar, InputMask
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const errors = useError();

    const form = reactive({
      title: '',
      text: '',
      roles: [],
      type: '',
      senders_all_roles: false
    });


    const breadcrumbs = ref([]);
    const notice = computed(() => store.getters.getCurrentNotice);
    const roles = computed(() => store.getters.getRolesList);
    const typeNotices = computed(() => store.getters.getListTypeNotices);

    watch(
        () => form.senders_all_roles,
        (val) => {
          if (val) {
            form.roles = roles.value.map(role => role.id);
          } else {
            form.roles = [];
          }
        });

    const toUpdateNotice = async () => {
      await store.dispatch('fetchUpdateNotice', {
        id: route.params.id,
        body: form
      });
    };

    const toDeclineNotice = async () => {
      try {
        await store.dispatch('fetchDeleteNotice', route.params.id);
        await router.push({name: 'notices'});
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(async () => {
      try {
        await store.dispatch('fetchNotice', route.params.id);
        await store.dispatch('fetchTypeNotices');
        await store.dispatch('fetchRoles');

        useCreateReactiveCopy(form, notice.value, {
          type: type => type.id,
        });

        form.roles = form.roles.map(role => role.id);

        breadcrumbs.value = [
          {label: 'Уведомления', router: {name: 'notices'}},
          {label: notice.value.id}
        ];
      } catch (e) {
        console.error(e);
      }
    });

    return {toUpdateNotice, toDeclineNotice, breadcrumbs, roles, typeNotices, notice, form, errors: errors.errors};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <div class="flex align-items-center">
        <Breadcrumb :data="breadcrumbs" separator="/"/>
        <span class="lowercase text-3xl" v-if="notice?.type">&nbsp;({{ notice.type.name }})</span>
      </div>

      <div class="flex">
        <Button v-if="notice?.state?.code === 'draft'" label="Удалить черновик" @click="toDeclineNotice"
                class="btn-error-outlined font-light"/>
        <Button @click="toUpdateNotice" label="Запланировать отправку" class="btn-primary font-light ml-3"/>
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
                v-model="form.type"
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
        </MainCard>
        <span class="text-xs color-error" v-if="errors.text">
          {{ errors.text[0] }}
        </span>
      </div>
    </div>
  </section>
</template>