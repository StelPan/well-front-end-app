<script>
import {defineComponent} from "vue";
import {useMeta} from "vue-meta";
import {useProfile} from "@/hooks/profile";
import {useLanguages} from "@/hooks/useLanguages";

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
    const {loadProfile} = useProfile();
    await loadProfile();
    next();
  },
  setup(globalConfig) {
    useMeta({
      title: 'Профиль'
    });

    const {
      clearAvatarFile,
      deleteAvatar,
      choose,
      updateProfile,
      profile,
      filesChoose,
      form: reactiveForm,
      isUpdated,
      v$,
    } = useProfile();

    const {languages} = useLanguages();

    const changeConfirmationStateModal = () => {
      store.dispatch('changeStateModal', {
        type: 'confirmationStateModal',
        bool: true
      })
    };


    return {
      v$,
      changeConfirmationStateModal,
      clearAvatarFile,
      updateProfile,
      deleteAvatar,
      choose,
      reactiveForm,
      filesChoose,
      languages,
      profile,
      isUpdated,
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
            v-if="!isUpdated"
            label="Сохранить изменения"
            @click="updateProfile"
            class="btn-primary font-light"
        />
        <ButtonSuccess v-if="isUpdated" label="Изменения сохранены"/>
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
                  <ButtonFileUpload
                      @chooseFiles="choose"
                      label="Изменить"
                      :classes="{'w-full': true}"
                  />

                  <Button @click="clearAvatarFile" label="Удалить" class="btn-primary-outlined w-full ml-2"/>
                </div>
              </div>

              <div v-else-if="profile.avatar" class="flex">
                <div class="w-2">
                  <Avatar
                      :image="profile.avatar.original_url"
                      shape="circle"
                      size="large"
                  />
                </div>

                <div class="flex justify-content-between w-full ml-2">
                  <ButtonFileUpload
                      @chooseFiles="choose"
                      label="Изменить"
                      :classes="{'w-full': true}"
                  />
                  <Button @click="deleteAvatar" label="Удалить" class="btn-primary-outlined w-full ml-2"/>
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
