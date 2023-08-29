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
    },
    buildingId: {
      type: Number,
      required: true,
    }
  }
});
</script>

<template>
  <DataTable :value="segments" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name_ru" header="Наименование сегмента">
      <template #body="slotProps">
        <router-link :to="{name: 'building-segment-edit', params: {id: buildingId, segment: slotProps.data.id}}">
          {{ slotProps.data.name_ru }}
        </router-link>
      </template>
    </Column>
    <Column field="categories_count" header="Категории"></Column>
    <Column field="rooms_count" header="Объекты"></Column>
  </DataTable>
</template>

<style scoped>

</style>