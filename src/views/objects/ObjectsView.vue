<script>
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";

import Button from "primevue/button";
import Paginator from "primevue/paginator";
import TabMenu from "primevue/tabmenu";
import ObjectsTable from "@/components/tables/ObjectsTable";
import Tab from "@/components/tabs/Tab.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, ObjectsTable, Paginator, TabMenu, Tab},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('loadSegments');
      await store.dispatch('loadCategoriesByFilter', store.getters.getListSegments[0].id);
      await store.dispatch('fetchObjectsByCategory', {
        category: store.getters.getListCategories[0].name_ru
      });
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const store = useStore();

    const first = ref(0);
    const activeSegmentIndex = ref(0);

    const objects = computed(() => store.getters.getListObjects);
    const segments = computed(() => store.getters.getListSegments);
    const categories = computed(() => store.getters.getListCategories);

    const activeSegment = computed(() => segments.value[activeSegmentIndex]);
    const categoriesTab = computed(() => categories.value.map(category => ({
      label: category.name_ru,
      type: category.name_ru,
      ...category
    })))

    const loadCategoriesBySegment = async () => {
      await store.dispatch('fetchObjectsByCategory', activeSegment.value.id);
    };

    const toggleTabHandler = async (category) => {
      await store.dispatch('fetchObjectsByCategory', {
        category: category.name_ru
      });
    }

    watch(activeSegment, async () => await loadCategoriesBySegment());

    const loadObject = async () => {
      await store.dispatch('fetchObjectsByCategory', {
        page: ((first.value / (objects.value?.data?.pagination?.per_page ?? 1)) + 1),
      });
    };

    return {
      objects,
      segments,
      categories,
      categoriesTab,
      activeSegment,
      activeSegmentIndex,
      toggleTabHandler,
    };
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Объекты</h1>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="flex justify-content-start">
      <TabMenu v-model:activeIndex="activeSegmentIndex" :model="segments.map(segment => ({label: segment.name_ru}))" />
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="flex justify-content-start">
      <Tab :tabs="categoriesTab" :default-tab-switch="categoriesTab[0]" @toggleTab="toggleTabHandler" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <ObjectsTable :objects="objects?.data?.data ?? []"/>

        <Paginator
            v-model:first="first"
            :rows="objects?.data?.pagination?.per_page ?? 0"
            :totalRecords="objects?.data?.pagination?.total ?? 0"
            class="justify-content-start"
        ></Paginator>
      </div>
    </div>
  </section>
</template>