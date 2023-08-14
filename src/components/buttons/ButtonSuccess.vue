<script>
import {defineComponent} from "vue";

import Button from "primevue/button";

export default defineComponent({
  components: {Button},
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    }
  }
});
</script>

<template>
  <Button class="btn-white">
    <i class="color-success" :class="icon ? icon : 'pi pi-chevron-circle-down'"></i>&nbsp;
    {{ label }}
  </Button>
</template>

<style>

</style>