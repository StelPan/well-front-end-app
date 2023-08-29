<script>
import {defineComponent} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    objects: {
      type: Array,
      required: true,
    }
  },
  setup() {

  }
});
</script>

<template>
  <DataTable :value="objects" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="number" header="Номер">

    </Column>
    <Column field="area" header="Площадь"></Column>
    <Column field="build" header="Здание"></Column>
    <Column field="status" header="Статус"></Column>
    <Column field="tariff" header="Тариф, Р"></Column>
    <Column field="bron" header="Бронь"></Column>
  </DataTable>
</template>

<style scoped>

</style>