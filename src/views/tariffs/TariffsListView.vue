<script>
import {computed, defineComponent, onMounted, watch, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

import Button from "primevue/button";
import Paginator from "primevue/paginator";
import TariffsTable from "@/components/tables/TariffsTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, TariffsTable, Paginator},
  async beforeRouteEnter (to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('fetchTariffs', {
        period: to.params.period,
        page: 1
      });
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const {t} = useI18n();
    const store = useStore();
    const route = useRoute();

    const first = ref(0);
    const tariffs = computed(() => store.getters.getListTariffs);

    const loadTariffs = async () => {
      await store.dispatch('fetchTariffs', {
        period: route.params.period,
        page: ((first.value / (tariffs.value?.data?.pagination?.per_page ?? 1)) + 1)
      });

      window.scrollTo(0,0);
    };

    watch(
        () => route.params.period,
        async (period) => {
          if (!period) return;
          await loadTariffs()
        }
    );

    onMounted(async () => {
      await loadTariffs();
    });

    return {tariffs, first, t};
  }
});
</script>

<template>
  <template v-if="tariffs?.data?.data ? tariffs.data.data.length : false">
    <section class="py-2 mb-3">
      <TariffsTable :tariffs="tariffs?.data?.data ?? []" />
    </section>

    <section class="py-2 mb-3">
      <Paginator
          v-model:first="first"
          :rows="tariffs?.data?.pagination?.per_page ?? 0"
          :totalRecords="tariffs?.data?.pagination?.total ?? 0"
          class="justify-content-start"
      ></Paginator>
    </section>
  </template>

  <template v-else>
    <section class="py-2 mb-3">
      <div class="flex justify-content-center">
        <span>{{ t('empty-data') }}</span>
      </div>
    </section>
  </template>
</template>

<style scoped>

</style>