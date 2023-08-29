<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {useMeta} from "vue-meta";
import {useError} from "@/hooks/useErrors";

import TabMenu from "primevue/tabmenu";
import Button from "primevue/button";
import Paginator from "primevue/paginator";
import Breadcrumb from "@/components/Breadcrumb.vue";
import SegmentsTabView from "@/views/buildings/tabs/SegmentsTabView.vue";
import InfrastructureTabView from "@/views/buildings/tabs/InfrastructureTabView.vue";
import ImprovementTabView from "@/views/buildings/tabs/ImprovementTabView.vue";
import LocationTabView from "@/views/buildings/tabs/LocationTabView.vue";
import AttractionTabView from "@/views/buildings/tabs/AttractionTabView.vue";
import DescriptionTabView from "@/views/buildings/tabs/DescriptionTabView.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    SegmentsTabView, ImprovementTabView, InfrastructureTabView, DescriptionTabView,
    LocationTabView, AttractionTabView, Breadcrumb, TabMenu, Button,
    Paginator,
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('fetchTypeLocations');
      await store.dispatch('fetchBuilding', to.params.id);
      await store.dispatch('fetchBuildingSegments');
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    useMeta({
      title: "Редактирование здания"
    });

    const store = useStore();
    const route = useRoute();
    const errors = useError();

    const form = ref({
      name_ru: '', name_en: '', name_ch: '',
      address_ru: '', address_en: '', address_ch: '',
      description_ru: '', description_en: '', description_ch: '',
      location_ru: '', location_en: '', location_ch: '',
      infrastructure_ru: '', infrastructure_en: '', infrastructure_ch: '',
      improvement_ru: '', improvement_en: '', improvement_ch: '',
      attraction_ru: '', attraction_en: '', attraction_ch: '',
      lat: '', lon: ''
    });

    const breadcrumbs = ref([]);

    const tabs = ref([
      {label: 'Сегменты', component: 'SegmentsTabView'},
      {label: 'Описание', component: 'DescriptionTabView'},
      {label: 'Инфраструктура', component: 'InfrastructureTabView'},
      {label: 'Благоустройство', component: 'ImprovementTabView'},
      {label: 'Расположение', component: 'LocationTabView'},
      {label: 'Достопримечательности', component: 'AttractionTabView'}
    ]);

    const activeTabIndex = ref(0);
    const activeTabComponent = computed(() => tabs.value[activeTabIndex.value]);
    const segments = computed(() => store.getters.getListBuildingSegments);
    const locationTypes = computed(() => store.getters.getListTypeLocations);
    const building = computed(() => store.getters.getCurrentBuilding);

    const first = ref(0);

    onMounted(async () => {
      try {
        breadcrumbs.value = [
          {label: 'Структура', router: {name: 'buildings'}},
          {label: building.value.name_ru}
        ];
      } catch (e) {
        console.error(e);
      }
    });

    return {
      tabs,
      activeTabIndex,
      breadcrumbs,
      activeTabComponent,
      locationTypes,
      segments,
      building,
      first,
      form,
      errors: errors.errors
    };
  }
})
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />
      <div class="flex">
        <Button label="Создать сегмент" class="btn-black-20-outlined font-light"/>
        <Button label="Сохранить изменение" class="btn-primary font-light ml-2" />
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="flex">
      <TabMenu v-model:active-index="activeTabIndex" :model="tabs" />
    </div>
  </section>

  <template v-if="activeTabComponent.component === 'SegmentsTabView'">
    <SegmentsTabView
        :segments="segments?.data?.data ?? []"
        :buildingId="building.id"
    />

    <Paginator
        v-model:first="first"
        :rows="segments?.data?.pagination?.per_page ?? 0"
        :totalRecords="segments?.data?.pagination?.total ?? 0"
        class="justify-content-start"
    ></Paginator>
  </template>

  <template v-else>
    <component
        :formData="form"
        :location-types="locationTypes"
        :errors="errors"
        :is="activeTabComponent.component"
    />
  </template>
</template>