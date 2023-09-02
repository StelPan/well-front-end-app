<script>
import {computed, defineComponent, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

import Button from "primevue/button";
import DataView from "primevue/dataview";
import TabMenu from "primevue/tabmenu";

export default defineComponent({
  layout: { name: 'AdminLayout' },
  components: {Button, DataView, TabMenu},
  setup() {
    const {t} = useI18n();
    const router = useRouter();
    const route = useRoute();

    const items = ref([
      {
        label: 'Штучные',
        to: '/services/list/single'
      },
      {
        label: 'Пакеты услуг',
        to: '/services/list/package'
      },
      {
        label: 'Разовые платежи',
        to: '/services/list/one_time'
      },
      {
        label: 'Категории услуг',
        to: '/services/categories'
      }
    ]);

    if (route.path === '/services') {
      router.push('/services/list/single');
    }

    const action = computed(() => {
      return route.path === '/services/categories' ?
          'categories' :
          'services';
    });

    const routes = computed(() => {
      return action.value === 'categories' ?
          {name: 'create-service-category'} :
          {name: 'create-service'};
    })

    const redirect = async () => {
      await router.push(routes.value)
    }

    return {items, action, redirect, t};
  }
});

</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between mb-3">
      <h1>{{ t('menu.services') }}</h1>

      <Button v-if="action !== 'categories'" @click="redirect" :label="t('labels.service-create')" class="btn-primary font-light ml-3" />
      <Button v-if="action === 'categories'" @click="redirect" :label="t('labels.service-category-create')" class="btn-primary font-light ml-3" />
    </div>

    <div class="flex">
      <TabMenu :model="items" />
    </div>
  </section>

  <router-view></router-view>
</template>

<style scoped>

</style>