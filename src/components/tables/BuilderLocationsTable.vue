<script>
import {defineComponent} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";

export default defineComponent({
  components: {DataTable, Column, Dropdown},
  props: {
    locations: {
      type: Array,
      required: true
    },
    locationTypes: {
      type: Array,
      required: true,
    }
  }
});
</script>

<template>
  <DataTable :value="locations" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="name_ru" header="Название точки"></Column>
    <Column field="address_ru" header="Адрес"></Column>
    <Column field="type" header="Тип точки">
      <template #body="slotProps">
        <Dropdown
            :options="locationTypes"
            optionLabel="name_ru"
            placeholder="Тип точки"
            class="w-full"
        />
      </template>
    </Column>
    <Column field="lat" header="Широта"></Column>
    <Column field="lon" header="Долгота"></Column>
  </DataTable>
</template>