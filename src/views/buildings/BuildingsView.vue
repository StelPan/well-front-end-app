<script>
import {defineComponent, ref, computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import Button from "primevue/button";
import BuildingsTable from "@/components/tables/BuildingsTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, BuildingsTable},
  setup() {
    const store = useStore();
    const router = useRouter();

    const buildings = computed(() => store.getters.getListBuildings);

    onMounted(async () => {
      await store.dispatch('fetchBuildings');
    });

    return { buildings };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Структура</h1>

      <Button label="Создать здание" class="btn-primary font-light" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <BuildingsTable :buildings="buildings" />
  </section>
</template>

<style scoped>

</style>