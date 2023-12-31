<script>

import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {useMeta} from "vue-meta";
import {useError} from "@/hooks/useErrors";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

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
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import ButtonSuccess from "@/components/buttons/ButtonSuccess.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    SegmentsTabView, ImprovementTabView, InfrastructureTabView, DescriptionTabView,
    LocationTabView, AttractionTabView, Breadcrumb, TabMenu, Button,
    Paginator, ConfirmationModal, ButtonSuccess,
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
    const router = useRouter();
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
    const first = ref(0);
    const visible = ref(false);
    const isUpdated = ref(false);

    const activeTabComponent = computed(() => tabs.value[activeTabIndex.value]);
    const segments = computed(() => store.getters.getListBuildingSegments);
    const locationTypes = computed(() => store.getters.getListTypeLocations);
    const building = computed(() => store.getters.getCurrentBuilding);

    const destroyBuilding = async () => {
      try {
        await store.dispatch('fetchDestroyBuilding', route.params.id);
        await router.push({name: 'buildings'});
        visible.value = false;
      } catch (e) {
        console.error(e);
      }
    };

    const changeFormData = (data) => {
      form.value = data;
    };

    const toCreateSegment = async () => {
      await router.push({name: 'building-segment-create', params: {id: building.value.id}});
    };

    const updateBuildingLocationPoint = async ({id, point_type_id}) => {
      await store.dispatch('fetchChangePointTypeLocationPoint', {
        buildingId: building.value.id,
        pointId: id,
        body: {point_type_id},
      });
    };

    const updateBuilding = async () => {
      try {
        await store.dispatch('fetchUpdateBuilding', {
          id: building.value.id,
          body: {
            ...form.value,
            name: form.value.name_ru,
            description: form.value.description_ru,
            address: form.value.address_ru
          },
        });

        isUpdated.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
        console.error(e);
      }
    };

    watch(form, () => isUpdated.value = false);

    onMounted(async () => {
      try {
        breadcrumbs.value = [
          {label: 'Структура', router: {name: 'buildings'}},
          {label: building.value.name_ru}
        ];

        useCreateReactiveCopy(form.value, building.value);
      } catch (e) {
        console.error(e);
      }
    });

    return {
      tabs,
      visible,
      isUpdated,
      activeTabIndex,
      breadcrumbs,
      activeTabComponent,
      locationTypes,
      segments,
      building,
      first,
      form,
      destroyBuilding,
      changeFormData,
      toCreateSegment,
      updateBuildingLocationPoint,
      updateBuilding,
      errors: errors.errors
    };
  }
})
</script>

<template>
  <ConfirmationModal v-model:visible="visible">
    <template #header>
      Удалить здание
    </template>

    <template #default>
      <span>
        Вы уверенны, что хотите удалить здание {{ building.name_ru }}? Это действие будет невозможно отменить
      </span>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Отменить" @click="visible = false" class="btn-black-20-outlined font-light w-12" />
        <Button label="Удалить" @click="destroyBuilding" class="btn-primary font-light ml-3 w-12" />
      </div>
    </template>
  </ConfirmationModal>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />
      <div class="flex">
        <Button @click="toCreateSegment" label="Создать сегмент" class="btn-black-20-outlined font-light mr-2"/>
        <ButtonSuccess v-if="isUpdated" label="Изменения сохранены" />
        <Button v-if="!isUpdated" @click="updateBuilding" label="Сохранить изменение" class="btn-primary font-light" />
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

  <template v-else-if="activeTabComponent.component === 'AttractionTabView'">
    <AttractionTabView
        :errors="errors"
        :location-types="locationTypes"
        :attraction-points="building.attraction_points"
        :form-data="form"
    />
  </template>

  <template v-else-if="activeTabComponent.component === 'LocationTabView'">
    <LocationTabView
        @toggleChangePointLocationType="updateBuildingLocationPoint"
        :errors="errors"
        :form-data="form"
        :location-types="locationTypes"
        :location-points="building.location_points"
    />
  </template>

  <template v-else>
    <component
        :formData="form"
        @changeFormData="changeFormData"
        :location-types="locationTypes"
        :errors="errors"
        :is="activeTabComponent.component"
    />
  </template>

  <section class="py-2 mb-3">
    <div class="flex justify-content-end">
      <span @click="visible = true" class="color-error underline cursor-pointer">
        Удалить здание
      </span>
    </div>
  </section>
</template>