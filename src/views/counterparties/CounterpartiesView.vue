<script>
import {defineComponent, onMounted, ref, reactive} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

import Button from "primevue/button";
import CounterpartyTable from "@/components/tables/CounterpartyTable";

export default defineComponent({
  layout: { name: 'AdminLayout' },
  components: {Button, CounterpartyTable},
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const counterparties = ref([]);

    onMounted(async () => {
      try {
        await store.dispatch('fetchCounterparties');
        counterparties.value = store.getters.getCounterpartiesList;
      } catch (e) {
        console.error(e);
      }
    });

    const toCounterpartyView = async () => {
      await router.push({ name: 'counterparty-create'});
    }

    return { counterparties, toCounterpartyView };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1 class="font-normal">Контрагенты</h1>
      <Button label="Создать контрагента" class="btn-primary font-light" @click="toCounterpartyView" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <CounterpartyTable :counterparties="counterparties" />
  </section>
</template>


<style scoped>

</style>