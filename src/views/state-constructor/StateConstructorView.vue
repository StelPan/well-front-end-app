<script>
import {computed, defineComponent, onMounted} from "vue";
import {useStore} from "vuex";

import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import StateConstructorTable from "@/components/tables/StateConstructorTable.vue";

export default defineComponent({
  layout: { name: 'AdminLayout' },
  components: {Button, StateConstructorTable, DataTable, Column},
  setup() {
    const store = useStore();

    const loadStateList = async () => {
      await store.dispatch('fetchStateList');
    };

    const loadPermissionList = async () => {
      await store.dispatch('fetchPermissions');
    }

    onMounted(async () => {
      await loadPermissionList();
      await loadStateList();
    });

    const states = computed(() => store.getters.getStateList);
    const permissions = computed(() => store.getters.getPermissionList);

    return {states, permissions};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1 class="font-normal">Конструктор состояний</h1>
      <Button label="Сохранить изменения" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <DataTable :value="states ?? []">
      <template v-for="(state, i) in states" :key="state.id">
        <Column></Column>
      </template>
    </DataTable>
  </section>
</template>

<style scoped lang="scss">

</style>
