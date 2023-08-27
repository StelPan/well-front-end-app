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
  setup(props, {emit}) {
    const checkboxes = reactive({});

    const fillCheckboxes = (data) => {
      data.forEach(category => {
        checkboxes[category.id] = ref(!!category.quick_access);

        watch(() => checkboxes[category.id], (value) => {
          emit('toggleChangeView', {category, quick_access: value});
        })
      });
    };

    fillCheckboxes(props.categories);
    watch(
        () => props.categories,
        fillCheckboxes
    );

    return {checkboxes};
  }
});
</script>

<template>
  <DataTable :value="categories" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name_ru" header="Наименование категории">
      <template #body="slotProps">
        <router-link :to="{name: 'service-category', params: {id: slotProps.data.id}}" class="color-primary">
          {{ slotProps.data.name_ru }}
        </router-link>
      </template>
    </Column>
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