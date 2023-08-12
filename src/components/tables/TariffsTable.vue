<script>
import {defineComponent} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    tariffs: {
      type: Array,
      required: true
    }
  }
});
</script>

<template>
  <DataTable :value="tariffs" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
  </DataTable>
</template>

<style scoped>

</style>