<script>
import {defineComponent} from "vue";

import Card from "primevue/card";

export default defineComponent({
  components: {Card},
});
</script>

<template>
  <Card>
    <template #subtitle>
      <slot name="subtitle"></slot>
    </template>

    <template #content>
      <slot name="content"></slot>
    </template>
  </Card>
</template>