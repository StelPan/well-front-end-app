<script>
import {defineComponent, ref} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    vendors: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const vendors = ref(props.vendors);
    return {vendors};
  }
});
</script>

<template>
  <DataTable :value="[{}]" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
  </DataTable>
</template>

<style scoped>
</style>