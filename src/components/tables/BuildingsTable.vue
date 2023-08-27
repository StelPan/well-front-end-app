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
    <Column field="name" header="Наименование" />
    <Column field="address" header="Адрес" />
    <Column field="segments" header="Сегменты" />
    <Column field="categories" header="Категории" />
    <Column field="objects" header="Объекты" />
  </DataTable>
</template>