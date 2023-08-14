<script>
import {defineComponent} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
});
</script>

<template>
  <DataTable :value="services" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
  </DataTable>
</template>

<style scoped>

</style>