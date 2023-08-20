<script>
import {defineComponent} from "vue";

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
});
</script>

<template>
  <DataTable :value="vendors" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Название управляющей компании">
      <template #body="slotProps">
        <router-link class="color-primary" :to="{name: 'vendor-view', params: {id: slotProps.data.id}}">
          {{ slotProps.data.name }}
        </router-link>
      </template>
    </Column>
    <Column field="acquiring" header="Эквайринг">
      <template #body="slotProps">
        {{ slotProps.data.acquiring ?? 'Отсутствует' }}
      </template>
    </Column>
  </DataTable>
</template>