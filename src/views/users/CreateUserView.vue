<script>
import {defineComponent, onMounted, computed, ref, reactive, watch} from "vue";
import {useStore} from "vuex";
import {useVuelidate} from '@vuelidate/core';
import {required, email, minLength, helpers} from '@vuelidate/validators';
import {useI18n} from "vue-i18n";
import {useError} from "@/hooks/useErrors";
import {useLanguages} from "@/hooks/useLanguages";
import {useMeta} from "vue-meta";

import Breadcrumb from "@/components/Breadcrumb.vue";
import MainCard from "@/components/cards/MainCard.vue";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputNumberPhone from "@/components/inputs/InputNumberPhone.vue";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import {useUsers} from "@/hooks/user";

export default defineComponent({
  layout: {
    name: 'AdminLayout',
  },
  components: {
    Breadcrumb, MainCard, MultiSelect, InputText, Button, Dropdown, SelectPhoneModal, InputNumberPhone, ButtonSuccess
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('fetchRoles');
      await store.dispatch('fetchCountries');
      store.commit('selectCountryByCountryName', "Russia")
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const {t} = useI18n({useScope: true});
    const {form: formReactive, v$} = useUsers();

    useMeta({
      title: t('pages-names.users')
    });

    const store = useStore();
    const errors = useError();
    const {languages} = useLanguages();

    const roles = computed(() => store.getters.getRolesList);
    const countries = computed(() => store.getters.getCountriesList);
    const country = computed(() => store.getters.getSelectCountry);
    const visible = ref(false);
    const isCreated = ref(false);

    const breadcrumbs = ref([
      {label: t('pages-names.users'), router: {name: 'users'}},
      {label: t('pages-names.create-user')}
    ]);

    const toCreateUser = async () => {
      try {
        const result = await v$.value.$validate();
        if (!result) {
          return;
        }

        await store.dispatch('fetchCreateUser', {
          ...formReactive.value,
          phone_code: country.value.phone_code
        });

        isCreated.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    watch(
        formReactive,
        () => {
          isCreated.value = false;
        }
    );

    onMounted(async () => {
      await store.dispatch('fetchCountries');
    });

    return {
      v$,
      isCreated,
      breadcrumbs,
      roles,
      formReactive,
      toCreateUser,
      languages,
      countries,
      country,
      visible,
      errors: errors.errors,
      t,
    };
  }
});
</script>

<template>
  <SelectPhoneModal
      @toggleCloseModal="visible = !visible"
      :countries="countries"
      :visible="visible"
  />
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <div class="flex">
        <ButtonSuccess v-if="isCreated" :label="t('successfully.user-created')"/>
        <Button
            :disabled="v$.result"
            :label="t('actions.create-user')"
            class="btn-primary font-light ml-2"
            @click="toCreateUser"
        />
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid mb-2 h-max">
      <div class="col-12 md:col-4 sm:col-6">
        <MainCard :title="t('card-names.basic-registration-information')" :styles="{'h-full': true }">
          <div class="flex flex-column gap-3">
            <div class="w-full mb-3">
              <span class="p-float-label w-full">
                <InputText
                    :class="{'p-invalid': v$.last_name.$errors.length}"
                    id="last_name"
                    class="w-full"
                    v-model="formReactive.last_name"
                />
                <label for="last_name">{{ t('labels.last-name') }}</label>
              </span>
              <span class="color-error text-xs" v-if="v$.last_name.$errors.length">
                {{ v$.last_name.$errors[0].$message }}
              </span>
            </div>

            <div class="w-full mb-3">
              <span class="p-float-label w-full">
                <InputText
                    v-model="formReactive.first_name"
                    :class="{'p-invalid': v$.first_name.$errors.length}"
                    id="first_name"
                    class="w-full"
                />
                <label for="first_name">{{ t('labels.first-name') }}</label>
              </span>
              <span class="text-xs color-error" v-if="v$.first_name.$errors.length">
                {{ v$.first_name.$errors[0].$message }}
              </span>
            </div>

            <span class="p-float-label mb-3 w-full">
              <InputText id="patronymic" class="w-full" v-model="formReactive.patronymic"/>
              <label for="patronymic">{{ t('labels.patronymic') }}</label>
            </span>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4 sm:col-6">
        <MainCard :title="t('card-names.contact-data')" :styles="{'h-full': true }">
          <div class="flex flex-column gap-3">
            <div class="mb-3">
              <div class="w-full">
                <InputNumberPhone
                    :classes="{'p-invalid': v$.phone.$errors.length}"
                    v-model="formReactive.phone"
                    :phone-code="country?.phone_code"
                    @toggleChangePhoneCode="visible = !visible"
                />
                <span class="color-error text-xs" v-if="v$.phone.$errors.length">
                {{ v$.phone.$errors[0].$message }}
                </span>
              </div>
            </div>
            <div class="w-full mb-3">
              <span class="p-float-label w-full">
                <InputText
                    v-model="formReactive.email"
                    :class="{'p-invalid': v$.email.$errors.length}"
                    id="phone"
                    class="w-full"
                />
                <label for="phone">{{ t('labels.email-for-notices') }} *</label>
              </span>
              <span class="text-xs color-error" v-if="v$.email.$errors.length">
                {{ v$.email.$errors[0].$message }}
              </span>
            </div>
          </div>
        </MainCard>
      </div>
      <div class="col-12 md:col-4 sm:col-6">
        <div class="grid flex-column h-max">
          <div class="col-12 h-full">
            <MainCard title="Роль" :styles="{'h-full': true}">
              <MultiSelect
                  v-model="formReactive.roles"
                  :class="{'p-invalid': v$.roles.$errors.length}"
                  display="chip"
                  :options="roles"
                  optionLabel="name_ru"
                  option-value="id"
                  :placeholder="t('labels.roles')"
                  class="w-full"/>
              <span class="color-error text-xs" v-if="v$.roles.$errors.length">
                {{ v$.roles.$errors[0].$message }}
              </span>
            </MainCard>
          </div>
          <div class="col-12 h-full">
            <MainCard title="Язык" :styles="{'h-full': true}">
              <Dropdown
                  v-model="formReactive.language"
                  :class="{'p-invalid': v$.language.$errors.length}"
                  :options="languages"
                  optionLabel="label"
                  option-value="value"
                  :placeholder="t('labels.language')"
                  class="w-full"/>
              <span class="color-error text-xs" v-if="v$.language.$errors.length">
                {{ v$.language.$errors[0].$message }}
              </span>
            </MainCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
