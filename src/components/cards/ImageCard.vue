<script>
import {defineComponent, ref} from "vue";

import Button from "primevue/button";

export default defineComponent({
  components: {Button},
  props: {
    src: {
      type: String,
      required: true,
    },
    handle: {
      type: Function,
      required: false,
    }
  },
  setup(props, {emit}) {
    const data = ref(props.source);
    const toggleCancel = () => {
      emit('toggleCancel', typeof props.handle === 'function' ? props.handle() : false);
    }

    return {data, toggleCancel};
  }
})
</script>

<template>
  <div class="image-card relative">
    <img class="w-full" :src="src" alt="">
    <i @click="toggleCancel" class="pi pi-times text-white cansel-button cursor-pointer" style="font-size: 1rem"></i>
  </div>
</template>

<style scoped>
.cansel-button {
  position: absolute;
  padding: 5px;
  right: 0;
  top: 0;
}
</style>