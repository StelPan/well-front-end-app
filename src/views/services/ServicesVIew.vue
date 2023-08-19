<script>
import {defineComponent, computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

import Button from "primevue/button";
import DataView from "primevue/dataview";
import TabMenu from "primevue/tabmenu";

export default defineComponent({
  layout: { name: 'AdminLayout' },
  components: {Button, DataView, TabMenu},
  setup() {
    const items = ref([
      {
        label: 'Штучные',
        to: '/services/single'
      },
      {
        label: 'Пакеты услуг',
        to: '/services/single1'
      },
      {
        label: 'Разовые платежи',
        to: '/services/single2'
      },
      {
        label: 'Категории услуг',
        to: '/services/categories'
      }
    ]);

    return {items};
  }
});

</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Услуги</h1>

      <Button label="Создать услугу" class="btn-primary font-light ml-3" />
    </div>

    <div class="flex">
      <TabMenu :model="items" />
    </div>
  </section>

  <router-view></router-view>
</template>

<style scoped>

</style>