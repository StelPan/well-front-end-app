<script>
import {defineComponent, onMounted, computed, ref, reactive, watch} from "vue";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";
import {useLanguages} from "@/hooks/useLanguages";

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
    const errors = useError();
    const {languages} = useLanguages();

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
        errors.setErrors(e.response.data.errors);
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
    });

    watch(
        formReactive,
        () => errors.clearErrors()
    )

    return {
      breadcrumbs,
      roles,
      formReactive,
      toCreateUser,
      languages,
      errors: errors.errors,
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <div class="flex">
        <Button label="Создать пользователя" class="btn-primary font-light w-12" @click="toCreateUser"/>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid mb-2 h-max">
      <div class="col-12 md:col-4 sm:col-6">
        <MainCard title="Основные регистрационные сведения" :styles="{'h-full': true }">
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
        <MainCard title="Контактные данные" :styles="{'h-full': true }">
          <div class="flex flex-column gap-3">
                <span class="p-float-label mb-3 w-full">
                  <InputText id="phone" class="w-full" :class="{'p-invalid': !!errors?.phone}"
                             v-model="formReactive.phone"/>
                  <label for="phone">Контактный номер *</label>
                  <span class="color-red" v-if="errors?.phone">
                    <template v-for="(error, i) in errors.phone" :key="i">
                      {{ error }} <br>
                    </template>
                  </span>
              </span>

            <span class="p-float-label mb-3 w-full">
                  <InputText id="phone" class="w-full" v-model="formReactive.email"/>
                  <label for="phone">E-mail (для уведомлений) *</label>
                </span>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4 sm:col-6">
        <div class="grid flex-column h-max">
          <div class="col-12 h-full">
            <MainCard title="Роль" :styles="{'h-full': true}">
              <MultiSelect
                  v-model="formReactive.roles"
                  display="chip"
                  :options="roles"
                  optionLabel="name_ru"
                  option-value="id"
                  placeholder="Роли"
                  class="w-full"/>
            </MainCard>
          </div>
          <div class="col-12 h-full">
            <MainCard title="Язык" :styles="{'h-full': true}">
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
      </div>
    </div>
  </section>
</template>
