<script>
import {defineComponent} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    partners: {
      type: Array,
      required: true,
    },
  },
});
</script>

<template>
  <DataTable :value="partners" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Наименование партнера">
      <template #body="slotProps">
        <router-link class="color-primary" :to="{name: 'partner-view', params: {id: slotProps.data.id}}">
          {{ slotProps.data.name }}
        </router-link>
      </template>
    </Column>
    <Column field="promo_type" header="Программа лояльности"></Column>
  </DataTable>
</template>

<style scoped>

</style>