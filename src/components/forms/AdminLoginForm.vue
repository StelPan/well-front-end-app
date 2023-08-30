<script>
import {defineComponent, ref, computed, reactive} from "vue";
import {useStore} from "vuex";
import { useVuelidate } from '@vuelidate/core';
import { required, email, integer } from '@vuelidate/validators';

import Button from 'primevue/button';
import InputMask from "primevue/inputmask";
import InputNumberPhone from "@/components/inputs/InputNumberPhone";

export default defineComponent({
  components: {Button, InputMask, InputNumberPhone},
  props: {
    errors: {
      type: Object,
      required: false
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const country = computed(() => store.getters.getSelectCountry);

    const phone = ref('');
    const formLogin = reactive({
      phone: ''
    });

    const isShowSelectPhoneModal = ref(false);

    const rules = {
      phone: { integer }
    };

    const v$ = useVuelidate(rules, formLogin)

    const toggleSelectPhone = () => {
      emit('toggleSelectPhone', true);
    }

    const toggleLogin = () => {
      emit('toggleLogin', phone.value);
    }

    return {
      formLogin,
      v$,
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
          v-model="phone"
          @toggleChangePhoneCode="toggleSelectPhone"
          :classes="{'p-invalid': errors?.error }"
          :phone-code="country?.phone_code ? country.phone_code : '+7'"
          :country="country?.name"
      />
      <span v-if="errors?.error" class="color-error text-xs">
        {{ errors.error }}
      </span>
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
