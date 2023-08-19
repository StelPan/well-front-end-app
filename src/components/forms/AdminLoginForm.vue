<script>
import {defineComponent, ref, computed} from "vue";
import {useStore} from "vuex";

import Button from 'primevue/button';
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import InputNumberPhone from "@/components/inputs/InputNumberPhone";

export default defineComponent({
  components: {Button, InputMask, InputText, InputNumberPhone},
  setup(props, { emit }) {
    const store = useStore();
    const country = computed(() => store.getters.getSelectCountry);

    const phone = ref('');
    const isShowSelectPhoneModal = ref(false);

    const toggleSelectPhone = () => {
      emit('toggleSelectPhone', true);
    }

    const toggleLogin = () => {
      emit('toggleLogin', phone.value);
    }

    return {
      phone,
      country,
      isShowSelectPhoneModal,
      toggleSelectPhone,
      toggleLogin,
    }
  }
});
</script>

<template>
  <div>
    <div class="mb-4">
      <InputNumberPhone
          @toggleChangePhoneCode="toggleSelectPhone"
          v-model="phone"
          :phone-code="country?.phone_code ? country.phone_code : '+7'"
          :country="country?.name"
      />
    </div>

    <div class="mb-2">
      <div class="card flex justify-content-center">
        <Button label="Войти" class="btn-primary font-light w-12" @click="toggleLogin"/>
      </div>
    </div>
  </div>
</template>

<style>
.icon-number {

}
</style>
