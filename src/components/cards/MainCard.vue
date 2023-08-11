<script>
import {defineComponent} from "vue";
import Card from "primevue/card";

export default defineComponent({
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
      required: true,
    }
  }
});
</script>

<template>
  <Card>
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <slot />
    </template>
  </Card>
</template>

<style scoped>
.p-card {
  border-radius: 8px;
  box-shadow: none;
}

.p-card-title {
  font-size: 3rem !important;
}
</style>
