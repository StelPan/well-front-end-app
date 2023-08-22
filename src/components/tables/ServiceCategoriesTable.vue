<script>
import {defineComponent, reactive, ref, watch} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Checkbox from "primevue/checkbox";

export default defineComponent({
  components: {DataTable, Column, Checkbox},
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const checkboxes = reactive({});

    const fillCheckboxes = (data) => {
      data.forEach(category => {
        checkboxes[category.id] = ref(!!category.quick_access);
      });
    };

    fillCheckboxes(props.categories);
    watch(props.categories, fillCheckboxes);

    return {checkboxes};
  }
});
</script>

<template>
  <DataTable :value="categories" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name_ru" header="Наименование категории"></Column>
    <Column field="view" header="Видимость">
      <template #body="slotProps">
        <Checkbox
            v-model="checkboxes[slotProps.data.id]"
            :name="`${slotProps.data.id}`"
            :value="!!slotProps.data.quick_access"
            binary
        />
        <label class="ml-2" :for="`${slotProps.data.id}`">Показывать в стратовом экране</label>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>