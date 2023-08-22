<script>
import {defineComponent} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
});
</script>

<template>
  <DataTable :value="categories" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Наименование категории">
      <template #body="slotProps">
        <router-link class="color-primary" :to="{ name: 'partner-category-view', params: {id: slotProps.data.id}}">
          {{ slotProps.data.name_ru }}
        </router-link>
      </template>
    </Column>
  </DataTable>
</template>