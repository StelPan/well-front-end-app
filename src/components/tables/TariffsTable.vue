<script>
import {defineComponent} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    tariffs: {
      type: Array,
      required: true
    }
  }
});
</script>

<template>
  <DataTable :value="tariffs ?? []" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name_ru" header="Наименование тарифа">
      <template #body="slotProps">
        <router-link
            class="color-black-80 color-primary-hover"
            :to="{ name: 'tariff-view', params: {id: slotProps.data.id}}"
        >
          {{ slotProps.data.name_ru }}
        </router-link>
      </template>
    </Column>
    <Column field="cost" header="Стоимость, руб."></Column>
  </DataTable>
</template>

<style scoped>

</style>