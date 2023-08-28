<script>
import {defineComponent} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    segments: {
      type: Array,
      required: true
    }
  }
});
</script>

<template>
  <DataTable :value="segments" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name_ru" header="Наименование сегмента"></Column>
    <Column field="categories_count" header="Категории"></Column>
    <Column field="rooms_count" header="Объекты"></Column>
  </DataTable>
</template>

<style scoped>

</style>