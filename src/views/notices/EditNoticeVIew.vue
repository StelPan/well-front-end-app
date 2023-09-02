<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {useError} from "@/hooks/useErrors";
import {useNotices} from "@/hooks/notices";

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
import Badge from "primevue/badge";

import {useRoles} from "@/hooks/role";

export default defineComponent({
  layout: {name: "AdminLayout"},
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadNotice, loadTypeNotices} = useNotices();
      const {loadRoles} = useRoles();
      await loadRoles();
      await loadNotice(to.params.id);
      await loadTypeNotices();
    } catch (e) {
      console.log(e);
    }

    next();
  },
  components: {
    Breadcrumb, Button, InputText,
    ButtonSuccess, MainCard, Checkbox,
    MultiSelect, Editor, Dropdown,
    Calendar, InputMask, Badge
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const {notice, formCreateNotice, v$, updateNotice, loadNotice, typeNotices, deleteNotice} = useNotices();
    const {roles} = useRoles();

    formCreateNotice.value  = {...notice.value};

    const breadcrumbs = ref([]);

    const toUpdateNotice = async () => {
      try {
        await updateNotice(
            route.params.id,
            formCreateNotice.value,
        )

      } catch (e) {
        console.error(e);
      }

      await loadNotice(route.params.id);
    };

    const toDeclineNotice = async () => {
      try {
        await deleteNotice(route.params.id);
        await router.push({name: 'notices'});
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(() => {
      formCreateNotice.value.roles = notice.value.roles.map(role => role.id);
      formCreateNotice.value.push_type_id = formCreateNotice.value.type.id;
      formCreateNotice.value.send_now = 0;

      breadcrumbs.value = [
        {label: 'Уведомления', router: {name: 'notices'}},
        {label: notice.value.id}
      ];
    });

    return {
      toUpdateNotice,
      toDeclineNotice,
      breadcrumbs,
      roles,
      typeNotices,
      notice,
      formCreateNotice,
      v$,
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <div class="flex align-items-center">
        <Breadcrumb :data="breadcrumbs" separator="/"/>
        <span class="lowercase text-3xl" v-if="notice?.type">&nbsp;({{ notice.type.name }})</span>

        <Badge
            v-if="notice.state.code === 'draft'"
            class="ml-2 btn-black-20 border-round-2xl"
            size="large"
        >Черновик</Badge>

        <Badge
            v-if="notice.state.code === 'pending'"
            class="ml-2 border-round-2xl"
            size="large"
        >Ожидает отправки</Badge>

        <Badge
            v-if="notice.state.code === 'sent'"
            class="ml-2 btn-success border-round-2xl"
            size="large"
        >Отправлено</Badge>
      </div>

      <div class="flex">
        <Button v-if="notice?.state?.code === 'draft'" label="Удалить черновик" @click="toDeclineNotice"
                class="btn-error-outlined font-light"/>
        <Button
            v-if="notice?.state?.code === 'draft'"
            @click="toUpdateNotice"
            label="Запланировать отправку"
            class="btn-primary font-light ml-3"
        />
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Наименование уведомления">
          <span class="p-float-label w-full">
            <InputText
                v-model="formCreateNotice.title"
                id="name"
                class="w-full"
                :class="{'p-invalid': v$.title.$errors.length}"
            />
            <label for="name">Наименование</label>
          </span>
          <span v-if=" v$.title.$errors.length" class="text-xs color-error">
            {{  v$.title.$errors[0].$message }}
          </span>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard title="Выберите или создайте тип уведомления">
          <div class="w-full mb-2">
            <Dropdown
                v-model="formCreateNotice.push_type_id"
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
                  v-model="formCreateNotice.send_date"
                  :disabled="formCreateNotice.send_now"
                  date-format="d.m.yy"
                  placeholder="Дата"
                  showIcon
                  class="w-full"
              />
            </div>
            <div class="col-12 md:col-6">
              <div class="w-full">
                <span class="p-input-icon-left p-float-label w-full">
                  <i class="pi pi-search"/>
                  <InputMask
                      id="time"
                      v-model="formCreateNotice.send_time"
                      :disabled="formCreateNotice.send_now"
                      class="w-full"
                      mask="99:99"
                      placeholder="12:00"
                  />
                  <label for="time">Время</label>
                </span>
              </div>
            </div>
          </div>

          <Checkbox v-model="formCreateNotice.send_now" :binary="true" name="send_now" id="send_now"/>
          <label for="send_now" class="ml-1">Отправить немедленно</label>
        </MainCard>
      </div>

      <div class="col-12 md:col-4">
        <MainCard title="Получатели уведомления">
          <div class="w-full mb-2">
            <MultiSelect
                v-model="formCreateNotice.roles"
                :class="{'p-invalid': v$.roles.$errors.length}"
                display="chip"
                :options="roles"
                optionLabel="name_ru"
                option-value="id"
                placeholder="Выберите получателя"
                class="w-full"
                :disabled="!!formCreateNotice.senders_all_roles"
            />
            <span v-if="v$.roles.$errors.length" class="text-xs color-error">
              {{ v$.roles.$errors[0].$message }}
            </span>
          </div>

          <Checkbox v-model="formCreateNotice.senders_all_roles" :binary="true" name="senders_all_roles" id="senders_all_roles"/>
          <label for="senders_all_roles" class="ml-1">Получатели - все роли</label>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <MainCard title="Текст уведомления">
          <Editor v-model="formCreateNotice.text" class="w-full"/>
        </MainCard>
        <span class="text-xs color-error" v-if="v$.text.$errors.length">
          {{ v$.text.$errors[0].$message }}
        </span>
      </div>
    </div>
  </section>
</template>