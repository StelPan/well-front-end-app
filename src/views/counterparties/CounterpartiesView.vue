<script>
import {defineComponent, onMounted, ref, reactive, computed} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

import Button from "primevue/button";
import Paginator from "primevue/paginator";
import CounterpartyTable from "@/components/tables/CounterpartyTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, CounterpartyTable, Paginator},
  setup() {
    const store = useStore();
    const router = useRouter();

    const counterparties = computed(() => store.getters.getCounterpartiesList);

    const first = ref(0);

    const loadCounterparties = async () => {
      const filterObject = {
        page: ((first.value / (counterparties.value?.data?.pagination?.per_page ?? 1)) + 1),
      };

      await store.dispatch('fetchCounterparties', filterObject);
    };

    onMounted(async () => {
      try {
        await loadCounterparties();
      } catch (e) {
        console.error(e);
      }
    });

    const toCounterpartyView = async () => {
      await router.push({name: 'counterparty-create'});
    }

    return {counterparties, toCounterpartyView, first};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1 class="font-normal">Контрагенты</h1>
      <Button label="Создать контрагента" class="btn-primary font-light" @click="toCounterpartyView"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <CounterpartyTable :counterparties="counterparties?.data?.data ?? []"/>
        <Paginator
            v-model:first="first"
            :rows="counterparties?.data?.pagination?.per_page ?? 0"
            :totalRecords="counterparties?.data?.pagination?.total ?? 0"
            class="justify-content-start"
        ></Paginator>
      </div>
    </div>
  </section>
</template>


<style scoped>

</style>