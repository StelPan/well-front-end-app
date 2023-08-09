<script>
import {defineComponent, ref} from "vue";

import Button from 'primevue/button';
import InputText from "primevue/inputtext";

export default defineComponent({
  components: {InputText, Button},
  setup(props, { emit }) {
    const code = ref('');

    const toggleCheckCode = () => {
      emit('toggleCheckCode', code.value);
    }

    const toggleChangeNumber = () => {
      emit('toggleChangeNumber', true);
    }

    return {
      code,
      toggleCheckCode,
      toggleChangeNumber
    };
  }
});
</script>

<template>
  <div>
    <div class="mb-4">
      <span class="p-float-label">
        <InputText id="code"/>
        <label for="code">Код подтверждения</label>
      </span>
    </div>

    <div class="mb-3">
      <div class="card flex justify-content-center">
        <Button label="Войти" class="btn-primary font-light w-12" @click="toggleCheckCode"/>
      </div>
    </div>

    <div class="mb-2 flex justify-content-start">
      <span @click="toggleChangeNumber" class="underline cursor-pointer color-primary">Изменить номер</span>
    </div>
  </div>
</template>
