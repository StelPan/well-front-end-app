<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import TabMenu from "primevue/tabmenu";
import Button from "primevue/button";
import Breadcrumb from "@/components/Breadcrumb.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess.vue";
import CategorySegmentDescriptionTabView from "@/views/buildings/category-segment/tabs/CategorySegmentDescriptionTabView.vue";
import CategorySegmentServicesTabView from "@/views/buildings/category-segment/tabs/CategorySegmentServicesTabView.vue";
import CategorySegmentTariffsView from "@/views/buildings/category-segment/tabs/CategorySegmentTariffsView.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    Breadcrumb,
    ButtonSuccess,
    TabMenu,
    Button,
    CategorySegmentDescriptionTabView,
    CategorySegmentServicesTabView,
    CategorySegmentTariffsView,
  },
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

      await store.dispatch('fetchRoomCategoryServices', {
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
    const route = useRoute();

    const breadcrumbs = ref([]);

    const tabs = ref([
      {label: 'Описание', component: 'CategorySegmentDescriptionTabView'},
      {label: 'Тарифы', component: 'CategorySegmentTariffsView'},
      {label: 'Услуги', component: 'CategorySegmentServicesTabView'},
    ]);

    const activeTabIndex = ref(0);
    const activeTabComponent = computed(() => tabs.value[activeTabIndex.value]);


    const segment = computed(() => store.getters.getCurrentBuildingSegment);
    const building = computed(() => store.getters.getCurrentBuilding);
    const category = computed(() => store.getters.getCurrentRoomCategory);

    const categoryTariffs = computed(() => store.getters.getRoomCategoryTariffsList);
    const categoryServices = computed(() => store.getters.getRoomCategoryServicesList);

    const inclusions = computed(() => store.getters.getListInclusions);

    const changeCategoryHandler = async () => {
      try {

      } catch (e) {

      }
    };

    const form = ref({
      ...category.value,
      inclusions: inclusions.value.map(inclusion => {
        const find = category.value.inclusions.find(categoryInclusion => categoryInclusion.id === inclusion.id);
        return {...inclusion, include: !!find};
      })
    });

    const servicesList = ref(categoryServices.value);
    const tariffsList = ref(categoryTariffs.value);


    const changeSetTariff = async ({id, set}) => {
      try {
        await store.dispatch('fetchTouchRoomCategoryTariff', {
          segmentId: segment.value.id,
          roomCategoryId: route.params.categoryId,
          body: {tariff: id, set: Number(set)}
        })
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(() => {
      breadcrumbs.value = [
        {label: 'Структура', router: {name: 'buildings'}},
        {label: building.value.name_ru, router: {name: 'building-edit', id: building.value.id}},
        {label: segment.value.name_ru, router: {name: 'building-segment-edit', params: {id: building.value.id, segment: segment.value.id}}},
        {label: category.value.name_ru}
      ]
    });

    return {
      category,
      breadcrumbs,
      tabs,
      activeTabIndex,
      activeTabComponent,
      servicesList,
      tariffsList,
      categoryTariffs,
      categoryServices,
      inclusions,
      form,
      changeSetTariff,
    };
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
    <CategorySegmentTariffsView
        @toggleTouchTariff="changeSetTariff"
        :tariffs="tariffsList"
    />
  </template>

  <template v-if="activeTabComponent.component === 'CategorySegmentDescriptionTabView'">
    <CategorySegmentDescriptionTabView
        :form-data="form"
        :inclusions="inclusions"
    />
  </template>

  <template v-if="activeTabComponent.component === 'CategorySegmentServicesTabView'">
    <CategorySegmentServicesTabView
        :services="servicesList"
    />
  </template>

</template>

<style scoped>

</style>