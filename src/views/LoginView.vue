<script>
import {defineComponent, ref, onMounted, computed, watch} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {useMeta} from "vue-meta";
import {useError} from "@/hooks/useErrors";
import {useCountries} from "@/hooks/countries";

import AdminLoginForm from "@/components/forms/AdminLoginForm.vue";
import SelectPhoneModal from "@/components/modals/SelectPhoneModal.vue";
import EnterSmsCodeForm from "@/components/forms/EnterSmsCodeForm.vue";

const STEP_SMS_REQUEST = "STEP_SMS_REQUEST";
const STEP_SMS_CHECK = "STEP_SMS_CHECK";

export default defineComponent({
  layout: {name: 'LoginLayout'},
  components: {
    AdminLoginForm,
    SelectPhoneModal,
    EnterSmsCodeForm,
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadCountries} = useCountries();
      await loadCountries();
    } catch (e) {
      console.error(e);
    }

    next();
  },
  setup() {
    useMeta({
      title: 'Авторизация'
    });

    const store = useStore();
    const router = useRouter();
    const errors = useError();

    const currentStep = ref(STEP_SMS_CHECK);
    const countries = computed(() => store.getters.getCountriesList);

    const changeStep = (step) => {
      currentStep.value = step
    };

    const visible = ref(false);

    const toggleLoginHandler = async (phone) => {
      try {
        await store.dispatch('fetchAuthorization', phone);
        changeStep(STEP_SMS_REQUEST);
      } catch (e) {
        errors.setErrors(e.response.data);
      }
    }

    const toggleCheckCodeHandler = async (code) => {
      try {
        await store.dispatch('fetchVerificationCode', {
          phone: store.getters.getPhone,
          phoneCode: store.getters.getSelectCountry.phone_code,
          code,
        });

        await store.dispatch('fetchUpdateAuth', true);

        await router.push('/users');
      } catch (e) {
        console.log(e)
      }
    }

    const toggleRetrySendCodeHandler = async () => {
      await toggleLoginHandler(store.getters.getPhone);
    };

    const toggleChangeNumberHandler = () => {
      changeStep(STEP_SMS_CHECK);
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
      toggleRetrySendCodeHandler,
      toggleChangeNumberHandler,
      toggleCheckCodeHandler,
      toggleLoginHandler,
      changeStep,
      errors: errors.errors
    };
  }
});
</script>

<template>
  <SelectPhoneModal
      v-model:modelValue="visible"
      :countries="countries"
  />

  <div class="container">
    <div class="grid">
      <div class="hidden md:block md:col-7 h-screen background-login">
      </div>
      <div class="col-12 md:col-5 py-0 px-3">
        <div class="grid justify-content-center h-screen">
          <div class="col-12 p-0">
            <div class="flex align-items-center h-screen">
              <div class="form w-full mx-2">
                <img class="gap-3 w-4rem mb-3" src="../assets/images/admin/Logo.png" alt="">
                <p class="mb-5 text-left text-xl font-bold">Добро пожаловать</p>

                <AdminLoginForm
                    v-if="currentStep === STEP_SMS_CHECK"
                    :errors="errors"
                    @toggleSelectPhone="visible = true"
                    @toggleLogin="toggleLoginHandler"
                />

                <EnterSmsCodeForm
                    v-if="currentStep === STEP_SMS_REQUEST"
                    @toggleChangeNumber="toggleChangeNumberHandler"
                    @toggleCheckCode="toggleCheckCodeHandler"
                    @toggleRetrySendCode="toggleRetrySendCodeHandler"
                />
              </div>
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
