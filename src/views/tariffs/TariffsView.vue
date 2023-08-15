<script>
import {defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import Button from "primevue/button";
import TabMenu from "primevue/tabmenu";
import TariffsTable from "@/components/tables/TariffsTable";

export default defineComponent({
  layout: {name: "AdminLayout"},
  components: {TariffsTable, Button, TabMenu},
  setup() {
    const store = useStore();

    const typesTariffItems = ref([]);
    const fillTypeTariffItems = () => {
      let tariffs = [];
      for (let period of store.getters.getListTypeTariffs) {
        tariffs.push({
          label: period.name,
          to: `/tariffs/list/${period.name}`
        });
      }

      typesTariffItems.value = tariffs;
    };

    onMounted(async () => {
      await store.dispatch('fetchTypeTariffs');
      fillTypeTariffItems();
    });

    return {typesTariffItems};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Тарифы</h1>
      <Button label="Создать тариф" class="btn-primary font-light" />
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <TabMenu :model="typesTariffItems" />
      </div>
    </div>
  </section>

  <router-view></router-view>
</template>

<style scoped>

</style>