<script>
import {defineComponent, ref, onMounted, computed} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

import AdminLoginForm from "@/components/forms/AdminLoginForm.vue";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal.vue";
import EnterSmsCodeForm from "@/components/forms/EnterSmsCodeForm.vue";

const STEP_SMS_REQUEST = "STEP_SMS_REQUEST";
const STEP_SMS_CHECK = "STEP_SMS_CHECK";

export default defineComponent({
  layout: {name: 'default'},
  components: {
    AdminLoginForm,
    SelectPhoneModal,
    EnterSmsCodeForm,
  },
  setup() {
    const store = useStore();

    const router = useRouter();

    const currentStep = ref(STEP_SMS_CHECK);

    const changeStep = (step) => {
      currentStep.value = step
    };

    const visible = ref(false);

    const countries = computed(() => store.getters.getCountriesList);

    const toggleLoginHandler = async (phone) => {
      try {
        await store.dispatch('fetchAuthorization', phone);
        changeStep(STEP_SMS_REQUEST);
      } catch (e) {
        // TODO: Something
      }
    }

    const toggleCheckCodeHandler = async (code) => {
      try {
        await store.dispatch('fetchVerificationCode', {
          phone: store.getters.getPhone,
          phoneCode: store.getters.getSelectCountry.phone_code,
          code,
        });

        await router.push('/users');
      } catch (e) {
        console.log(e)
      }
    }

    const toggleChangeNumberHandler = () => {
      changeStep(STEP_SMS_CHECK);
    };

    const showSelectPhoneModal = () => {
      visible.value = true;
    };

    onMounted(async () => {
      await store.dispatch('fetchCountries');
      store.commit('selectCountryByCountryName', 'Russia');
    });

    return {
      STEP_SMS_CHECK,
      STEP_SMS_REQUEST,
      visible,
      countries,
      currentStep,
      showSelectPhoneModal,
      toggleChangeNumberHandler,
      toggleCheckCodeHandler,
      toggleLoginHandler,
      changeStep,
    };
  }
});
</script>

<template>
  <SelectPhoneModal
      v-model:visible="visible"
      :countries="countries ?? []"
      @toggleCloseModal="visible = false"
  />

  <div class="container">
    <div class="grid">
      <div class="hidden md:block md:col-7 h-screen background-login">
      </div>
      <div class="col-12 md:col-5">
        <div class="flex justify-content-center h-screen">
          <div class="flex align-items-center">
            <div class="form">
              <img class="gap-3 w-4rem mb-3" src="../assets/images/admin/Logo.png" alt="">
              <p class="mb-5 text-left text-xl font-bold">Добро пожаловать</p>

              <AdminLoginForm
                  v-if="currentStep === STEP_SMS_CHECK"
                  @toggleSelectPhone="showSelectPhoneModal"
                  @toggleLogin="toggleLoginHandler"
              />

              <EnterSmsCodeForm
                  v-if="currentStep === STEP_SMS_REQUEST"
                  @toggleChangeNumber="toggleChangeNumberHandler"
                  @toggleCheckCode="toggleCheckCodeHandler"
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
  background: url('../assets/images/admin/Image.png') no-repeat center;
  background-size: cover;
}
</style>
