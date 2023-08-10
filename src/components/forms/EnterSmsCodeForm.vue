<script>
import {defineComponent, ref} from "vue";

import Button from 'primevue/button';
import InputText from "primevue/inputtext";
import Timer from "../timers/Timer.vue";

export default defineComponent({
  components: {InputText, Button, Timer},
  setup(props, {emit}) {
    const code = ref('');

    const timeVisible = ref(true);

    const toggleCheckCode = () => {
      emit('toggleCheckCode', code.value);
    }

    const toggleChangeNumber = () => {
      emit('toggleChangeNumber', true);
    }

    const toggleRetrySendCode = () => {
      emit('toggleRetrySendCode', true);
      timeVisible.value = true;
    }

    const expiredTimeEventHandler = () => timeVisible.value = false;

    return {
      code,
      timeVisible,
      toggleCheckCode,
      toggleChangeNumber,
      toggleRetrySendCode,
      expiredTimeEventHandler,
    };
  }
});
</script>

<template>
  <div>
    <div class="mb-4">
      <span class="p-float-label p-input-icon-right">
        <Timer
            :minutes="1"
            v-if="timeVisible"
            @expiredTimeEvent="expiredTimeEventHandler"
        />

        <i
            @click="toggleRetrySendCode"
            v-if="!timeVisible"
            class="pi cursor-pointer"
        >
          <span class="m-0 p-0 color-primary underline">
            Отправить повторно
          </span>
        </i>

        <InputText v-model="code" id="code"/>

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
