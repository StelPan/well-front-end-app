<script>
import {defineComponent, ref} from "vue";

import Button from 'primevue/button';
import InputMask from "primevue/inputmask";

export default defineComponent({
  components: {Button, InputMask},
  setup(props, { emit }) {
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
      <span class="p-input-icon-left p-float-label">
        <i class="pi pi-search cursor-pointer" @click="toggleSelectPhone" />
        <InputMask id="phone" v-model="phone" mask="999-999-9999" placeholder="999-999-9999"/>
        <label for="phone">Контактный телефон</label>
      </span>
    </div>

    <div class="mb-2">
      <div class="card flex justify-content-center">
        <Button label="Войти" class="btn-primary font-light w-12" @click="toggleLogin"/>
      </div>
    </div>
  </div>
</template>
