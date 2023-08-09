<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

import AdminLoginForm from "@/components/forms/AdminLoginForm.vue";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal.vue";
import EnterSmsCodeForm from "@/components/forms/EnterSmsCodeForm.vue";

export default defineComponent({
  layout: { name: 'default'},
  components: {
    AdminLoginForm,
    SelectPhoneModal,
    EnterSmsCodeForm,
  },
  setup() {
    const store = useStore();

    const currentStep = ref('sms-request');

    const changeStep = (step) => currentStep.value[step];


    const visible = ref(false);

    const countries = computed(() => store.getters.getCountriesList);

    const showSelectPhoneModal = () => {
      visible.value = true;
    }

    onMounted(async () => {
      await store.dispatch('fetchCountries');
    })

    return {
      visible,
      countries,
      showSelectPhoneModal,
      currentStep,
      changeStep,
    };
  }
});
</script>

<template>
  <SelectPhoneModal
      v-model:visible="visible"
      :countries="countries ?? []"
  />

  <div class="container">
    <div class="grid">
      <div class="col-lg-12 md:col-7 background-login h-screen">
      </div>
      <div class="col-lg-12 md:col-5">
        <div class="flex justify-content-center h-screen">
          <div class="flex align-items-center">
            <div class="form">
              <img class="gap-3 w-4rem mb-3" src="../../assets/images/admin/Logo.png" alt="">
              <p class="mb-5 text-left text-xl font-bold">Добро пожаловать</p>

              <AdminLoginForm
                  v-if="currentStep === 'sms-request'"
                  @toggleSelectPhone="showSelectPhoneModal"
                  @toggleLogin=""
              />

              <EnterSmsCodeForm
                  v-if="currentStep === 'sms-check'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.background-login {
  background: url('../../assets/images/admin/Image.png') no-repeat center;
  background-size: cover;
}
</style>
