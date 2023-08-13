<script>
import {defineComponent} from "vue";

import Dialog from "primevue/dialog";

export default defineComponent({
  components: {Dialog},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
  }
});
</script>

<template>
  <Dialog
      :visible="visible"
      modal
      :close-on-escape="true"
      :closable="false"
      :style="{ width: '50vw', 'border-radius': '20px' }"
  >
    <template #header>
      <slot name="header"></slot>
    </template>

    <template #default>
      <span>
        <slot name="default"></slot>
      </span>
    </template>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </Dialog>
</template>

<style scoped>

</style>