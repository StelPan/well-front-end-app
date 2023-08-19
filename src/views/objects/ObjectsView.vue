<script>
import {computed, defineComponent, onMounted} from "vue";
import {useStore} from "vuex";

import Button from "primevue/button";
import ObjectsTable from "@/components/tables/ObjectsTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, ObjectsTable},
  setup() {
    const store = useStore();

    const objects = computed(() => store.getters.getListObjects);

    onMounted(async () => {
      await store.dispatch('loadSegments');
      await store.dispatch('loadCategoriesByFilter', 1);
      await store.dispatch('fetchObjectsByCategory', { category: 1});
    });

    return {objects};
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Объекты</h1>

      <Button label="Создать объект" class="btn-primary font-light" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <ObjectsTable :objects="objects" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>