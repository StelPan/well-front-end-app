<script>
import {defineComponent, ref} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    banks: {
      type: Array,
      required: true,
    }
  },
});
</script>

<template>
  <DataTable :value="banks" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Банк">
      <template #body="slotProps">
        <router-link class="color-primary" :to="{name: 'acquiring-create', params: {id: slotProps.data.id}}">
          {{ slotProps.data.name}}
        </router-link>
      </template>
    </Column>
    <Column field="accounts" header="Кол-во счетов"></Column>
  </DataTable>
</template>

<style scoped>
</style>