<script>
import {computed, defineComponent, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router"

import Button from "primevue/button";
import TariffsTable from "@/components/tables/TariffsTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, TariffsTable},
  setup() {
    const store = useStore();
    const route = useRoute();

    const tariffs = computed(() => store.getters.getListTariffs);

    watch(
        () => route.params.period,
        async (period) => {
          await store.dispatch('fetchTariffs', { period })
        }
    );

    return {tariffs};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <TariffsTable :tariffs="tariffs?.data?.data ?? []" />
  </section>
</template>

<style scoped>

</style>