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
      required: false,
    },
    styles: {
      type: Object,
      required: false
    }
  }
});
</script>

<template>
  <Card :class="styles">
    <template #title v-if="title">
      <div class="flex justify-content-between">
        <span>{{ title }}</span>
        <slot name="title-action"></slot>
      </div>
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
