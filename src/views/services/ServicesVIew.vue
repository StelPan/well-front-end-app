<script>
import {defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {useRouter, useRoute} from "vue-router";

import Button from "primevue/button";
import DataView from "primevue/dataview";
import TabMenu from "primevue/tabmenu";

export default defineComponent({
  layout: { name: 'AdminLayout' },
  components: {Button, DataView, TabMenu},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const items = ref([
      {
        label: 'Штучные',
        to: '/services/list/single'
      },
      {
        label: 'Пакеты услуг',
        to: '/services/list/single1'
      },
      {
        label: 'Разовые платежи',
        to: '/services/list/single2'
      },
      {
        label: 'Категории услуг',
        to: '/services/categories'
      }
    ]);

    if (route.path === '/services') {
      router.push('/services/list/single');
    }

    return {items};
  }
});

</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between mb-3">
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