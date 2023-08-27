<script>
import {defineComponent, onMounted, computed, ref, watch, reactive} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useError} from "@/hooks/useErrors";
import {useLanguages} from "@/hooks/useLanguages";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";

import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess.vue";
import {useMeta} from "vue-meta";

export default defineComponent({
  layout: {
    name: 'AdminLayout',
  },
  components: {Breadcrumb, MainCard, InputText, Dropdown, Button, MultiSelect, ButtonSuccess},
  setup() {
    useMeta({
      title: 'Редактирование пользователя'
    });

    const store = useStore();
    const route = useRoute();
    const errors = useError();
    const {languages} = useLanguages();

    let formReactive = reactive({
      first_name: '',
      last_name: '',
      patronymic: '',
      roles: [],
      email: '',
      phone: '',
      language: ''
    });

    let isUpdated = ref(false);

    const saveUserData = async () => {
      try {
        await store.dispatch(
            'fetchSaveUserData',
            {id: route.params.id, data: formReactive}
        );

        isUpdated.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors)
      }
    };

    const breadcrumbs = ref([]);

    watch(formReactive, () => isUpdated.value = false);

    onMounted(async () => {
      await store.dispatch('fetchUser', route.params.id);
      await store.dispatch('fetchRoles');

      const label = ((user.value.last_name ? user.value.last_name + ' ' : '') ?? ' -')
          + ((user.value.first_name ? user.value.first_name + ' ' : '') ?? ' -')
          + ((user.value.patronymic ? user.value.patronymic + ' ' : '') ?? ' -');

      breadcrumbs.value = [
        {label: 'Пользователи', router: {name: 'users'}},
        {label}
      ];

      useCreateReactiveCopy(
          formReactive,
          store.getters.getCurrentUser,
          // {roles: (roles) => roles.map(role => role.id)}
      );

      formReactive.roles = store.getters.getCurrentUser.roles.map(role => role.id);
    });

    const user = computed(() => store.getters.getCurrentUser);
    const roles = computed(() => store.getters.getRolesList);

    return {
      user,
      roles,
      breadcrumbs,
      formReactive,
      saveUserData,
      isUpdated,
      languages,
      errors: errors.errors,
    };
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between mb-3">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <div class="flex">
        <Button v-if="!isUpdated" label="Сохранить изменения" class="btn-primary font-light" @click="saveUserData"/>
        <ButtonSuccess v-if="isUpdated" label="Изменения сохранены"/>
      </div>
    </div>
    <div class="flex justify-content-between mb-3">
      <span class="color-black-40">
        <template v-for="(role, i) in user?.roles" :key="i">
          {{ role.name_ru }}

          <template v-if="i !== user.roles.length - 1"> + </template>
        </template>
      </span>
    </div>

    <div class="grid mb-3 h-max">
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Основные регистрационные сведения">
          <div class="flex flex-column gap-3 ">
            <div class="mb-3">
              <span class="p-float-label w-full">
                <InputText
                    id="last_name" class="w-full"
                    :class="{'p-invalid': errors.last_name}"
                    v-model="formReactive.last_name"/>
                <label for="last_name">Фамилия</label>
              </span>
              <span v-if="errors.last_name" class="color-red text-xs">
                {{ errors.last_name[0] }}
              </span>
            </div>
            <div class="mb-3">
              <span class="p-float-label w-full">
                <InputText
                    id="first_name" class="w-full"
                    :class="{'p-invalid': errors.first_name}"
                    v-model="formReactive.first_name"/>
                <label for="first_name">Имя</label>
              </span>
              <span v-if="errors.first_name" class="color-red text-xs">
                {{ errors.first_name[0] }}
              </span>
            </div>
            <div class="mb-3">
              <span class="p-float-label w-full">
                <InputText
                    id="patronymic" class="w-full"
                    :class="{'p-invalid': errors.patronymic}"
                    v-model="formReactive.patronymic"/>
                <label for="patronymic">Отчество</label>
              </span>
              <span v-if="errors.patronymic" class="color-red text-xs">
                {{ errors.patronymic[0] }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" title="Контактные данные">
          <div class="flex flex-column gap-3">
            <div class="mb-3">
              <span class="p-float-label w-full">
                <InputText id="phone" class="w-full" :class="{'p-invalid': errors.phone}" v-model="formReactive.phone"/>
                <label for="phone">Контактный номер *</label>
              </span>
              <span v-if="errors.phone" class="color-red text-xs">
                {{ errors.phone[0] }}
              </span>
            </div>

            <div class="mb-3">
              <span class="p-float-label mb-3 w-full">
                <InputText id="phone" class="w-full" :class="{'p-invalid': errors.email}" v-model="formReactive.email"/>
                <label for="phone">E-mail (для уведомлений) *</label>
              </span>
              <span v-if="errors.email" class="color-red text-xs">
                {{ errors.phone[0] }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <div class="flex flex-column gap-3">
          <MainCard title="Роль">
            <MultiSelect
                v-model="formReactive.roles"
                :class="{'p-invalid': errors.roles}"
                display="chip"
                :options="roles"
                optionLabel="name_ru"
                option-value="id"
                placeholder="Роли"
                class="w-full"
            />

            <span v-if="errors.roles" class="color-error text-xs">
              {{ errors.roles[0] }}
            </span>
          </MainCard>

          <MainCard title="Язык">
            <Dropdown
                v-model="formReactive.language"
                :class="{'p-invalid': errors.language}"
                :options="languages"
                optionLabel="label"
                option-value="value"
                placeholder="Язык"
                class="w-full"
            />

            <span v-if="errors.language" class="color-error text-xs">
              {{ errors.language[0] }}
            </span>
          </MainCard>

          <MainCard title="Быстрые ссылки"></MainCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.p-inputtext {
  border-radius: 5px !important;
}
</style>
