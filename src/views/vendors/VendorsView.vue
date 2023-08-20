<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";

import Button from "primevue/button";
import TabMenu from "primevue/tabmenu";
import VendorsTable from "@/components/tables/VendorsTable";

export default defineComponent({
  layout: {name: "AdminLayout"},
  components: {Button, VendorsTable, TabMenu},
  setup() {
    const items = ref([
      {
        label: 'Реквизиты',
        to: '/vendors/list'
      },
      {
        label: 'Эквайринг',
        to: '/vendors/banks'
      }
    ]);

    return {items};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Обслуживающие компании</h1>
      <Button label="Добавить реквизиты" class="btn-primary font-light" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <TabMenu :model="items" />
  </section>

  <router-view></router-view>
</template>

<style scoped>

</style>