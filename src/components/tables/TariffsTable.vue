<script>
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    tariffs: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const {t} = useI18n();
    return {t};
  }
});
</script>

<template>
  <DataTable :value="tariffs ?? []" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>
    <Column field="name_ru" :header="t('tables.tariffs.name')">
      <template #body="slotProps">
        <router-link
            class="color-black-80 color-primary-hover"
            :to="{ name: 'tariff-view', params: {id: slotProps.data.id}}"
        >
          {{ slotProps.data.name_ru }}
        </router-link>
      </template>
    </Column>
    <Column field="cost" :header="t('tables.tariffs.cost')"></Column>
  </DataTable>
</template>