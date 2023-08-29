<script>
import {defineComponent, ref, computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import Button from "primevue/button";
import BuildingsTable from "@/components/tables/BuildingsTable";
import Paginator from "primevue/paginator";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, BuildingsTable, Paginator},
  setup() {
    const store = useStore();
    const router = useRouter();

    const first = ref(0);

    const buildings = computed(() => store.getters.getListBuildings);

    const loadBuildings = async () => {
      try {
        const filterObject = {
          page: ((first.value / (buildings.value?.data?.pagination?.per_page ?? 1)) + 1),
        };

        await store.dispatch('fetchBuildings', filterObject);
      } catch (e) {
        console.error(e);
      }
    };

    const toCreateBuilding = async () => {
      await router.push({name: 'create-building'});
    };

    onMounted(async () => {
      await loadBuildings();
    });

    return { toCreateBuilding, buildings, first };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Структура</h1>

      <Button @click="toCreateBuilding" label="Создать здание" class="btn-primary font-light" />
    </div>
  </section>

  <section class="py-2 mb-3">
<!--    <div v-if="!buildings?.data?.data" class="flex justify-content-center align-items-center center-text-screen">-->
<!--      <span class="color-black-40">-->
<!--        Здесь пока ничего нет-->
<!--      </span>-->
<!--    </div>-->
<!--    v-if="Array.isArray(buildings?.data?.data) ? buildings.data.data.length : false"-->
    <div>
      <BuildingsTable :buildings="buildings?.data?.data ?? []" />

      <Paginator
          v-model:first="first"
          :rows="buildings?.data?.pagination?.per_page ?? 0"
          :totalRecords="buildings?.data?.pagination?.total ?? 0"
          class="justify-content-start"
      ></Paginator>
    </div>
  </section>
</template>

<style scoped>

</style>