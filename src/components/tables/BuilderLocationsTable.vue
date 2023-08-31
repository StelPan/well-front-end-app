<script>
import {defineComponent, ref} from "vue";

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
  },
  setup(props, {emit}) {
    const points = ref(props.locations);
    const types = ref([...props.locationTypes]);

    const change = ({id, point_type_id}) => {
      emit('toggleChangePointType', {id, point_type_id});
    };

    return {change, points, types};
  }
});
</script>

<template>
  <DataTable :value="points" showGridlines selectionMode="single">
    <Column field="name_ru" header="Название точки"></Column>
    <Column field="address_ru" header="Адрес"></Column>
    <Column field="type" header="Тип точки">
      <template #body="slotProps">
        <Dropdown
            @change="change(slotProps.data)"
            v-model="slotProps.data.point_type_id"
            :options="types"
            optionValue="id"
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