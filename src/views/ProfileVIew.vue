<script>
import {computed, defineComponent, onMounted, ref, reactive, watch} from "vue";
import {useStore} from "vuex";
import {useMeta} from "vue-meta";

import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import MainCard from "@/components/cards/MainCard";
import FileUpload from "@/components/FileUpload.vue";
import ButtonFileUpload from "@/components/buttons/ButtonFileUpload.vue";

export default defineComponent({
  layout: { name: 'AdminLayout' },
  components: {MainCard, Button, InputText, Dropdown, FileUpload, ButtonFileUpload},
  async beforeRouteEnter(to, from, next) {
    const store = useStore();
    await store.dispatch('fetchProfile');
    next();
  },
  setup() {
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

    const reactiveForm = reactive({
      first_name: '',
      last_name: '',
      patronymic: '',
      email: '',
      phone: '',
      phone_code: ''
    });

    const profile = computed(() => store.getters.getProfile);
    useCreateReactiveCopy(reactiveForm, profile.value);

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

    const toggleUpdateProfile = async () => {
      await store.dispatch("fetchUpdateProfile", {
        id: profile.value.id,
        body: reactiveForm
      });
    };

    return {changeConfirmationStateModal, languages, reactiveForm, profile, toggleUpdateProfile};
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-6">
        <h1>Профиль</h1>
      </div>
      <div class="col-12 md:col-6">
        <div class="flex">
          <Button label="Выйти" @click="changeConfirmationStateModal" class="btn-error-outlined font-light w-12" />
          <Button label="Сохранить изменения" @click="toggleUpdateProfile" class="btn-primary font-light ml-3 w-12" />
        </div>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <MainCard title="Основные сведения">
      <div class="grid">
        <div class="col-12 md:col-4">
         <div class="grid mb-4 gap-4 m-0 flex-column">
             <span class="p-float-label w-full">
                <InputText v-model="reactiveForm.last_name" id="last_name" class="w-full"/>
                <label for="last_name">Фамилия *</label>
            </span>
           <span class="p-float-label w-full">
                    <InputText v-model="reactiveForm.first_name" id="first_name" class="w-full"/>
                    <label for="first_name">Имя *</label>
           </span>
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
             <span class="p-float-label w-full">
                <InputText v-model="reactiveForm.email" id="email" class="w-full"/>
                <label for="email">Email *</label>
            </span>

            <Dropdown
                :options="languages"
                optionLabel="label"
                option-value="value"
                placeholder="Язык"
                class="w-full" />
          </div>
        </div>
      </div>
    </MainCard>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 sm:col-6">
        <MainCard title="Фото профиля">
          <div class="grid">
            <div class="col-12">
              <ButtonFileUpload label="Добавить фото" />
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
