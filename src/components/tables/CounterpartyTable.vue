<script>
import {defineComponent, ref} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    counterparties: {
      type: Array,
      required: true
    }
  },
});
</script>

<template>
<DataTable :value="counterparties">
  <Column field="id" header="ID"></Column>
  <Column field="name" header="ФИО"></Column>
  <Column field="type" header="Тип">
    <template #body="slotProps">
      <template v-if="slotProps.data.type === 'ul'">
        Юр. лицо
      </template>
      <template v-else>
        Физ. лицо
      </template>
    </template>
  </Column>
  <Column field="phone" header="Контактный телефон"></Column>
</DataTable>
</template>

<style scoped>

</style>