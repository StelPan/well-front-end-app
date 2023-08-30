<script>
import {defineComponent} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";

export default defineComponent({
  components: {DataTable, Column, Dropdown},
  props: {
    builderId: {
      type: Number,
      required: true,
    },
    segmentId: {
      type: Number,
      required: true,
    },
    categories: {
      type: Array,
      required: true
    },
  }
});
</script>

<template>
  <DataTable :value="categories" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name_ru" header="Название категории">
      <template #body="slotProps" >
        <router-link
            :to="{name: 'building-room-categories-view', params: {id: builderId, segmentId: segmentId, categoryId: slotProps.data.id }}"
            class="color-primary"
        >
          {{ slotProps.data.name_ru }}
        </router-link>
      </template>
    </Column>
    <Column field="rooms_count" header="Объекты"></Column>
  </DataTable>
</template>