<script>
import {computed, defineComponent, onMounted, ref, reactive, watch} from "vue";
import {useStore} from "vuex";
import {useMeta} from "vue-meta";
import {useVuelidate} from '@vuelidate/core';
import {required, email, minLength, helpers} from '@vuelidate/validators';
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Avatar from "primevue/avatar";
import MainCard from "@/components/cards/MainCard";
import FileUpload from "@/components/FileUpload.vue";
import ButtonFileUpload from "@/components/buttons/ButtonFileUpload.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {MainCard, Button, InputText, Dropdown, FileUpload, ButtonFileUpload, Avatar, ButtonSuccess},
  async beforeRouteEnter(to, from, next) {
    const store = useStore();
    await store.dispatch('fetchProfile');
    next();
  },
  setup(globalConfig) {
    useMeta({
      title: 'Профиль'
    });

    const store = useStore();

    const changeConfirmationStateModal = () => {
      store.dispatch('changeStateModal', {
        type: 'confirmationStateModal',
        bool: true
      })
    };

    const profile = computed(() => store.getters.getProfile);

    const reactiveForm = ref(profile.value);
    const isUpdate = ref(false);

    const message = 'Поле обязательно для заполнения';
    const emailErrorMessage = 'Некорректный email';
    const rules = {
      first_name: {required: helpers.withMessage(message, required)},
      last_name: {required: helpers.withMessage(message, required)},
      email: {
        required: helpers.withMessage(emailErrorMessage, required),
        email: helpers.withMessage(emailErrorMessage, email),
      },
      phone: {required: helpers.withMessage(message, required)},
      roles: {required: helpers.withMessage(message, required)},
      language: {required: helpers.withMessage(message, required)},
    }

    const v$ = useVuelidate(rules, reactiveForm);

    const languages = [{
      label: 'Русский',
      value: 'ru'
    }, {
      label: 'Английский',
      value: 'en'
    }, {
      label: 'Китайский',
      value: 'ch'
    }];

    const filesChoose = ref(false);
    const choose = (files) => {
      filesChoose.value = files;
    };

    const toggleUpdateProfile = async () => {
      try {
        const result = await v$.value.$validate();
        if (!result) {
          return false;
        }

        const formData = new FormData();

        for (let key in reactiveForm) {
          formData.set(key, reactiveForm[key]);
        }

        if (filesChoose.value?.files) {
          formData.set('avatar', filesChoose.value.files[0]);
        }

        await store.dispatch("fetchUpdateProfile", {
          id: profile.value.id,
          body: formData,
        });

        isUpdate.value = true;
      } catch (e) {
        console.error(e);
      }
    };

    watch(reactiveForm, () => isUpdate.value = false);

    const destroyAvatar = async () => {
      if (filesChoose.value?.files) {
        filesChoose.value = false;
      } else {
        // TODO: Destroy avatar
      }
    };

    const changeAvatar = async (files) => {
      if (files?.files) {
        filesChoose.value = false;
      }

      // TODO: loadFiles
    };

    return {
      v$,
      changeConfirmationStateModal,
      toggleUpdateProfile,
      choose,
      reactiveForm,
      filesChoose,
      languages,
      profile,
      isUpdate,
    };
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Профиль</h1>
      <div class="flex">
        <Button label="Выйти" @click="changeConfirmationStateModal" class="btn-error-outlined font-light mr-3"/>
        <Button
            v-if="!isUpdate"
            label="Сохранить изменения"
            @click="toggleUpdateProfile"
            class="btn-primary font-light"
        />
        <ButtonSuccess v-if="isUpdate" label="Изменения сохранены" />
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Основные сведения">
      <div class="grid">
        <div class="col-12 md:col-4">
          <div class="grid mb-4 gap-4 m-0 flex-column">
            <div>
              <span class="p-float-label w-full">
                  <InputText
                      v-model="reactiveForm.last_name"
                      :class="{'p-invalid': v$.last_name.$errors.length}"
                      id="last_name"
                      class="w-full"
                  />
                  <label for="last_name">Фамилия *</label>
              </span>
              <span class="text-xs color-error" v-if="v$.last_name.$errors.length">
               {{ v$.last_name.$errors[0].$message }}
             </span>
            </div>
            <div class="w-full">
             <span class="p-float-label w-full">
                <InputText
                    v-model="reactiveForm.first_name"
                    :class="{'p-invalid': v$.first_name.$errors.length}"
                    id="first_name"
                    class="w-full"
                />
                <label for="first_name">Имя *</label>
             </span>
              <span class="text-xs color-error" v-if="v$.first_name.$errors.length">
               {{ v$.first_name.$errors[0].$message }}
             </span>
            </div>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="grid mb-4 gap-4 m-0 flex-column">
             <span class="p-float-label w-full">
                <InputText v-model="reactiveForm.patronymic" id="patronymic" class="w-full"/>
                <label for="patronymic">Отчество</label>
            </span>
            <span class="p-float-label w-full">
                <InputText v-model="reactiveForm.phone" id="phone" class="w-full"/>
                <label for="phone">Контактный телефон *</label>
             </span>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="grid mb-4 gap-4 m-0 flex-column">
            <div class="w-full">
               <span class="p-float-label w-full">
                  <InputText
                      v-model="reactiveForm.email"
                      :class="{'p-invalid': v$.email.$errors.length}"
                      id="email"
                      class="w-full"
                  />
                  <label for="email">Email *</label>
              </span>
              <span class="color-error text-xs" v-if="v$.email.$errors.length">
                {{ v$.email.$errors[0].$message }}
              </span>
            </div>

            <Dropdown
                v-model="reactiveForm.language"
                :class="{'p-invalid': v$.language.$errors.length}"
                :options="languages"
                optionLabel="label"
                option-value="value"
                placeholder="Язык"
                class="w-full"/>
            <span class="text-xs color-error" v-if="v$.language.$errors.length">
              {{ v$.language.$errors[0].$message }}
            </span>
          </div>
        </div>
      </div>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 sm:col-4">
        <MainCard title="Фото профиля">
          <div class="grid">
            <div class="col-12">
              <div v-if="filesChoose?.files" class="flex">
                <div class="w-2">
                  <Avatar
                      :image="filesChoose.files[0].objectURL"
                      shape="circle"
                      size="large"
                  />
                </div>

                <div class="flex justify-content-between w-full ml-2">
                  <Button label="Изменить" class="btn-primary w-full font-light"/>
                  <Button label="Удалить" class="btn-primary-outlined w-full ml-2"/>
                </div>
              </div>
              <ButtonFileUpload v-else @chooseFiles="choose" label="Добавить фото"/>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>
