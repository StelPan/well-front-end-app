<script>
import {defineComponent, onMounted, computed, ref, reactive} from "vue";
import { useStore } from "vuex";

import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";

export default defineComponent({
  layout: {
    name: 'AdminLayout',
  },
  components: {Breadcrumb, MainCard, MultiSelect, InputText, Button, Dropdown},
  setup() {
    const store = useStore();

    const languages = [{
      label: 'Русский',
      value: 'ru'
    }, {
      label: 'Английский',
      value: 'en'
    }, {
      label: 'Чешский',
      value: 'ch'
    }];

    onMounted(async () => {
      await store.dispatch('fetchRoles');
    });

    const roles = computed(() => store.getters.getRolesList);

    const breadcrumbs = ref([{
      label: 'Пользователи',
      router: {name: 'users'}
    }, {
      label: 'Создание пользователя',
    }]);

    const toCreateUser = async () => {
      try {
        await store.dispatch('fetchCreateUser', formReactive);
      } catch (e) {
        console.error(e);
      }
    }

    const formReactive = reactive({
      first_name: '',
      last_name: '',
      patronymic: '',
      email: '',
      phone: '',
      roles: [],
      language: '',
    })

    return { breadcrumbs, roles, formReactive, toCreateUser, languages };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />

      <div class="flex">
        <Button label="Создать пользователя" class="btn-primary font-light w-12" @click="toCreateUser" />
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid mb-2">
      <div class="col-12 md:col-4 sm:col-6">
        <MainCard title="Основные регистрационные сведения">
          <div class="flex flex-column gap-3">
            <span class="p-float-label mb-3 w-full">
              <InputText id="last_name" class="w-full" v-model="formReactive.last_name"/>
              <label for="last_name">Фамилия</label>
            </span>

            <span class="p-float-label mb-3 w-full">
              <InputText id="first_name" class="w-full" v-model="formReactive.first_name"/>
              <label for="first_name">Имя</label>
            </span>

            <span class="p-float-label mb-3 w-full">
              <InputText id="patronymic" class="w-full" v-model="formReactive.patronymic"/>
              <label for="patronymic">Отчество</label>
            </span>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4 sm:col-6">
        <MainCard title="Контактные данные">
            <div class="flex flex-column gap-3">
                <span class="p-float-label mb-3 w-full">
                  <InputText id="phone" class="w-full" v-model="formReactive.phone"/>
                  <label for="phone">Контактный номер *</label>
              </span>

                <span class="p-float-label mb-3 w-full">
                  <InputText id="phone" class="w-full" v-model="formReactive.email"/>
                  <label for="phone">E-mail (для уведомлений) *</label>
                </span>
            </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4 sm:col-6">
        <div class="grid flex-column">
          <div class="col-12">
            <MainCard title="Роль">
              <MultiSelect
                  v-model="formReactive.roles"
                  display="chip"
                  :options="roles"
                  optionLabel="name_ru"
                  option-value="id"
                  placeholder="Роли"
                  class="w-full" />
            </MainCard>
          </div>
          <div class="col-12">
            <MainCard title="Язык">
              <Dropdown
                  v-model="formReactive.language"
                  :options="languages"
                  optionLabel="label"
                  option-value="value"
                  placeholder="Язык"
                  class="w-full" />
            </MainCard>
          </div>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="col-12">
        <MainCard title="Файлы">
          <div class="grid">
            <div class="col-12 md:col-3">
              <Button label="Добавить файл" class="btn-primary font-light"/>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>
