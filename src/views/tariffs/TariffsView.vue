<script>
import {defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import Button from "primevue/button";
import TariffsTable from "@/components/tables/TariffsTable";

export default defineComponent({
  layout: {name: "AdminLayout"},
  components: {TariffsTable, Button},
  setup() {
    const store = useStore();

    const tariffs = ref(store.getters.getListTariffs);

    onMounted(async () => {
      await store.dispatch('fetchTypeTariffs');
    });

    return {tariffs};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex">
      <h1>Тарифы</h1>
      <Button label="Создать тариф" class="btn-primary font-light w-12" />
    </div>
  </section>
</template>

<style scoped>

</style>