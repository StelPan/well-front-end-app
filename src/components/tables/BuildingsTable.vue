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
    <Column field="name_ru" header="Наименование">
      <template #body="slotProps">
        <router-link :to="{name: 'building-edit', params: {id: slotProps.data.id}}" class="color-primary">
          {{ slotProps.data.name_ru }}
        </router-link>
      </template>
    </Column>
    <Column field="address_ru" header="Адрес" />
    <Column field="segments_count" header="Сегменты" />
    <Column field="categories_count" header="Категории" />
    <Column field="rooms_count" header="Объекты" />
  </DataTable>
</template>