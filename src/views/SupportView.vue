<script>
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";

import InputText from "primevue/inputtext";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {InputText},
  setup() {
    const store = useStore();

    const message = ref('');
    const toggle = computed(() => store.getters.getToggle);

    return {message, toggle};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <h1>Поддержка</h1>
  </section>

  <section
      class="py-3 fixed content-messages"
      :class="{'message-section-showed': toggle, 'message-section-closed': !toggle}"
  >
    <div class="flex justify-content-center align-items-center h-full">
      <span class="color-black-40">Напишите о возникшей проблеме</span>
    </div>
  </section>

  <section
      class="py-3 px-3 bg-white fixed bottom-0"
      :class="{'message-section-showed': toggle, 'message-section-closed': !toggle}"
  >
    <span class="p-input-icon-right w-full">
      <i class="pi pi-arrow-up bg-neutral" />
      <InputText v-model="message" class="border-round-3xl w-full" placeholder="Введите текст сообщения" />
    </span>
  </section>
</template>

<style scoped>
.message-section-showed {
  width: calc(100% - 300px);
  left: 300px;
}

.message-section-closed {
  width: calc(100% - 126px);
  left: 126px;
}

.content-messages {
  height: calc(100% - 190px);
}
</style>