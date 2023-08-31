<script>
import {computed, defineComponent, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";

import TabMenu from "primevue/tabmenu";
import Button from "primevue/button";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {TabMenu, Button},
  setup() {
    const route = useRoute();
    const router = useRouter();

    const items = ref([
      {
        label: 'Список партнеров',
        to: '/partners/list'
      },
      {
        label: 'Категории партнеров',
        to: '/partners/categories'
      }
    ]);

    const uri = ref(route.path);

    watch(
        () => route.path,
        (val) => uri.value = route.path
    );

    watch(
        () => route.path,
        async (val) => uri.value = route.path
    );

    const label = computed(() => {
      let l = '';
      switch (uri.value) {
        case '/partners/categories':
          l = 'Создать категорию';
      }

      return l;
    });

    const toCreateCategory = async () => {
      await router.push({name: 'partner-category-create'});
    }

    return {items, label, toCreateCategory};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Партнеры</h1>

      <Button
          v-if="label.length"
          @click="toCreateCategory"
          :label="label"
          class="btn-primary font-light"
      />
    </div>
  </section>

  <section class="py-2 mb-3">
    <TabMenu :model="items"/>
  </section>

  <router-view></router-view>
</template>