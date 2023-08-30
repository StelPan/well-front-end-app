<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import Breadcrumb from "@/components/Breadcrumb.vue";
import TabMenu from "primevue/tabmenu";
import CategorySegmentDescriptionTabView from "@/views/buildings/category-segment/tabs/CategorySegmentDescriptionTabView.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Breadcrumb, TabMenu, CategorySegmentDescriptionTabView},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();

      await store.dispatch('fetchBuilding', to.params.id);

      await store.dispatch('fetchBuildingSegment', to.params.segmentId);

      await store.dispatch('fetchRoomCategory', {
        segmentId: to.params.segmentId,
        roomCategoryId: to.params.categoryId,
      });

      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const store = useStore();

    const breadcrumbs = ref([]);

    const tabs = ref([
      {label: 'Описание', component: 'CategorySegmentDescriptionTabView'},
      {label: 'Тарифы', component: 'CategorySegmentDescriptionTabView'},
      {label: 'Услуги', component: 'CategorySegmentDescriptionTabView'},
    ]);

    const activeTabIndex = ref(0);

    const activeTabComponent = computed(() => tabs.value[activeTabIndex.value]);
    const segment = computed(() => store.getters.getCurrentBuildingSegment);
    const building = computed(() => store.getters.getCurrentBuilding);
    const category = computed(() => store.getters.getCurrentRoomCategory);

    onMounted(() => {
      breadcrumbs.value = [
        {label: 'Структура', router: {name: 'buildings'}},
        {label: building.value.name_ru, router: {name: 'building-edit', id: building.value.id}},
        {label: segment.value.name_ru, router: {name: 'building-segment-edit', params: {id: building.value.id, segment: segment.value.id}}},
        {label: category.value.name_ru}
      ]
    });

    return {category, breadcrumbs, tabs, activeTabIndex, activeTabComponent};
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="flex">
      <TabMenu v-model:active-index="activeTabIndex" :model="tabs" />
    </div>
  </section>

  <component
      :is="activeTabComponent.component"
  />
</template>

<style scoped>

</style>