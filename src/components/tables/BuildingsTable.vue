<script>
import {defineComponent} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    buildings: {
      type: Array,
      required: true
    }
  }
});
</script>

<template>
  <DataTable :value="buildings" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID" />
  </DataTable>
</template>