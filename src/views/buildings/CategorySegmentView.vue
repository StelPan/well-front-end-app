<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import Breadcrumb from "@/components/Breadcrumb.vue";
import TabMenu from "primevue/tabmenu";
import Button from "primevue/button";
import CategorySegmentDescriptionTabView from "@/views/buildings/category-segment/tabs/CategorySegmentDescriptionTabView.vue";
import CategorySegmentTariffsView from "@/views/buildings/category-segment/tabs/CategorySegmentTariffsView.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Breadcrumb, TabMenu, CategorySegmentDescriptionTabView, CategorySegmentTariffsView, Button},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();

      await store.dispatch('fetchBuilding', to.params.id);

      await store.dispatch('fetchBuildingSegment', to.params.segmentId);

      await store.dispatch('fetchRoomCategory', {
        segmentId: to.params.segmentId,
        roomCategoryId: to.params.categoryId,
      });

      await store.dispatch('fetchInclusions');

      await store.dispatch('fetchRoomCategoryTariffs', {
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
      {label: 'Тарифы', component: 'CategorySegmentTariffsView'},
      {label: 'Услуги', component: 'CategorySegmentDescriptionTabView'},
    ]);

    const activeTabIndex = ref(0);

    const activeTabComponent = computed(() => tabs.value[activeTabIndex.value]);
    const segment = computed(() => store.getters.getCurrentBuildingSegment);
    const building = computed(() => store.getters.getCurrentBuilding);
    const category = computed(() => store.getters.getCurrentRoomCategory);
    const tariffs = computed(() => store.getters.getRoomCategoryTariffsList);
    const inclusions = computed(() => store.getters.getListInclusions);

    onMounted(() => {
      breadcrumbs.value = [
        {label: 'Структура', router: {name: 'buildings'}},
        {label: building.value.name_ru, router: {name: 'building-edit', id: building.value.id}},
        {label: segment.value.name_ru, router: {name: 'building-segment-edit', params: {id: building.value.id, segment: segment.value.id}}},
        {label: category.value.name_ru}
      ]
    });

    return {category, breadcrumbs, tabs, activeTabIndex, activeTabComponent, tariffs, inclusions};
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />
      <Button label="Сохранить изменения" class="btn-primary font-light" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="flex">
      <TabMenu v-model:active-index="activeTabIndex" :model="tabs" />
    </div>
  </section>

  <template v-if="activeTabComponent.component === 'CategorySegmentTariffsView'">
    <CategorySegmentTariffsView :tariffs="tariffs" />
  </template>

  <template v-if="activeTabComponent.component === 'CategorySegmentDescriptionTabView'">
    <CategorySegmentDescriptionTabView
        :inclusions="inclusions"
    />
  </template>

</template>

<style scoped>

</style>