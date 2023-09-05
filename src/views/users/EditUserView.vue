<script>
import {defineComponent, onMounted, ref, watch, unref} from "vue";
import {useRoute} from "vue-router";
import {useLanguages} from "@/hooks/useLanguages";
import {useCountries} from "@/hooks/countries";
import {useRoles} from "@/hooks/role";
import {useUsers} from "@/hooks/user";
import {useI18n} from "vue-i18n";
import {useMeta} from "vue-meta";

import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";
import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess.vue";
import InputNumberPhone from "@/components/inputs/InputNumberPhone.vue";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal.vue";

export default defineComponent({
  layout: {
    name: 'AdminLayout',
  },
  components: {
    Breadcrumb, MainCard, InputText,
    Dropdown, Button, MultiSelect,
    ButtonSuccess, InputNumberPhone, SelectPhoneModal
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadRoles} = useRoles();
      const {loadCountries, toSelectCountryByPhoneCode} = useCountries();
      const {loadUser} = useUsers();

      await loadUser(to.params.id);
      await loadRoles();
      await loadCountries();

      toSelectCountryByPhoneCode();

      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const {t} = useI18n();

    useMeta({
      title: 'Редактирование пользователя'
    });

    const route = useRoute();
    const {roles} = useRoles();
    const {languages} = useLanguages();
    const {countries, selectCountry: country} = useCountries();
    const {updateUser, user, v$, form: formReactive, isUpdated} = useUsers();

    formReactive.value = {...unref(user)};

    let visible = ref(false);

    const saveUserData = async () => {
      try {
        const data = {};
        for (let key in formReactive.value) {
          if (key === 'avatar') continue;
          data[key] = formReactive.value[key];
        }

        await updateUser({
          id: route.params.id,
          data
        });
      } catch (e) {
        console.error(e);
      }
    };

    watch(formReactive, () => {
      isUpdated.value = false;
    });

    const breadcrumbs = ref([]);

    onMounted(async () => {
      const label = ((user.value.last_name ? user.value.last_name + ' ' : '') ?? ' -')
          + ((user.value.first_name ? user.value.first_name + ' ' : '') ?? ' -')
          + ((user.value.patronymic ? user.value.patronymic + ' ' : '') ?? ' -');

      breadcrumbs.value = [
        {label: t('pages-names.edit-user'), router: {name: 'users'}},
        {label}
      ];

      formReactive.value.roles = user.value.roles.map(role => role.id);
    });

    return {
      user,
      roles,
      breadcrumbs,
      formReactive,
      saveUserData,
      isUpdated,
      visible,
      languages,
      countries,
      country,
      t,
      v$,
    };
  }
})
</script>

<template>
  <SelectPhoneModal
      v-model:modelValue="visible"
      :countries="countries"
  />
  <section class="py-2 mb-3">
    <div class="flex justify-content-between mb-3">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <div class="flex">
        <Button v-if="!isUpdated" :label="t('labels.save-changes')" class="btn-primary font-light" @click="saveUserData"/>
        <ButtonSuccess v-if="isUpdated" :label="t('labels.changes-saved')"/>
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
        <MainCard :styles="{'h-full': true}" :title="t('card-names.basic-registration-information')">
          <div class="flex flex-column gap-3">
            <div class="mb-3">
              <span class="p-float-label w-full">
                <InputText
                    v-model="formReactive.last_name"
                    :class="{'p-invalid': v$.last_name.$errors.length}"
                    id="last_name"
                    class="w-full"
                />
                <label for="last_name">{{ t('labels.last-name') }}</label>
              </span>
              <span v-if="v$.last_name.$errors.length" class="color-red text-xs">
                {{ v$.last_name.$errors[0].$message }}
              </span>
            </div>
            <div class="mb-3">
              <span class="p-float-label w-full">
                <InputText
                    id="first_name" class="w-full"
                    :class="{'p-invalid': v$.first_name.$errors.length}"
                    v-model="formReactive.first_name"/>
                <label for="first_name">{{ t('labels.first-name') }}</label>
              </span>
              <span v-if="v$.first_name.$errors.length" class="color-red text-xs">
                {{ v$.first_name.$errors[0].$message }}
              </span>
            </div>
            <div class="mb-3">
              <span class="p-float-label w-full">
                <InputText
                    id="patronymic" class="w-full"
                    v-model="formReactive.patronymic"/>
                <label for="patronymic">{{ t('labels.patronymic') }}</label>
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <MainCard :styles="{'h-full': true}" :title="t('card-names.contact-data')">
          <div class="flex flex-column gap-3">
            <div class="mb-3">
              <InputNumberPhone
                  v-model="formReactive.phone"
                  :class="{'p-invalid': v$.phone.$errors.length}"
                  @toggleChangePhoneCode="visible = !visible"
                  :phone-code="country?.phone_code ? country.phone_code : '+7'"
                  :country="country?.name"
              />
              <span v-if="v$.phone.$errors.length" class="color-red text-xs">
                {{ v$.phone.$errors[0].$message }}
              </span>
            </div>

            <div class="mb-3">
              <span class="p-float-label w-full">
                <InputText
                    id="email"
                    class="w-full"
                    :class="{'p-invalid': v$.email.$errors.length}"
                    v-model="formReactive.email"
                />
                <label for="email">{{ t('labels.email-for-notices') }} *</label>
              </span>
              <span v-if="v$.email.$errors.length" class="color-red text-xs">
                {{ v$.email.$errors[0].$message }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4">
        <div class="flex flex-column gap-3">
          <MainCard :title="t('card-names.role')">
            <MultiSelect
                v-model="formReactive.roles"
                :class="{'p-invalid': v$.roles.$errors.length}"
                display="chip"
                :options="roles"
                optionLabel="name_ru"
                option-value="id"
                :placeholder="t('placeholders.roles')"
                class="w-full"
            />

            <span v-if="v$.roles.$errors.length" class="color-error text-xs">
              {{ v$.roles.$errors[0].$message }}
            </span>
          </MainCard>

          <MainCard :title="t('card-names.language')">
            <Dropdown
                v-model="formReactive.language"
                :class="{'p-invalid': v$.language.$errors.length}"
                :options="languages"
                optionLabel="label"
                option-value="value"
                :placeholder="t('card-names.language')"
                class="w-full"
            />

            <span v-if="v$.language.$errors.length" class="color-error text-xs">
              {{ v$.language.$errors[0].$message }}
            </span>
          </MainCard>

<!--          <MainCard title="Быстрые ссылки"></MainCard>-->
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
