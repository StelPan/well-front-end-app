<script>
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Paginator from "primevue/paginator";
import MainCard from "@/components/cards/MainCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import BuildingCategoriesTable from "@/components/tables/BuildingCategoriesTable.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {InputText, MainCard, Breadcrumb, Button, ButtonSuccess, BuildingCategoriesTable, Paginator},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('fetchBuilding', to.params.id);
      await store.dispatch('fetchBuildingSegment', to.params.segment);
      await store.dispatch('fetchRoomCategories', {
        segmentId: store.getters.getCurrentBuildingSegment.id,
        params: {page: 1}
      });
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const form = ref({
      name_ru: ''
    });

    const first = ref(0);

    const isUpdated = ref(false);
    const breadcrumbs = ref([]);
    const building = computed(() => store.getters.getCurrentBuilding);
    const segment = computed(() => store.getters.getCurrentBuildingSegment);
    const categories = computed(() => store.getters.getRoomCategoriesList);

    const updateSegment = async () => {
      await store.dispatch('fetchUpdateSegment', {
        id: route.params.segment,
        body: form.value,
      });

      isUpdated.value = true;
    };

    onMounted(() => {
      breadcrumbs.value = [
        {label: 'Структура', router: {name: 'buildings'}},
        {label: building.value.name_ru, router: {name: 'building-edit', params: {id: building.id}}},
        {label: "Апартаменты"}
      ];

      form.value.name_ru = segment.value.name_ru;
    });

    watch(first, async () => {
      await store.dispatch('fetchRoomCategories', {
        segmentId: store.getters.getCurrentBuildingSegment.id,
        params: {page: ((first.value / (categories.value?.data?.pagination?.per_page ?? 1)) + 1)}
      });
    });

    watch(form, () => isUpdated.value = false);

    return {form, breadcrumbs, segment, building, updateSegment, isUpdated, categories};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>
      <div class="flex">
        <ButtonSuccess v-if="isUpdated" label="Изменения сохранены"/>
        <Button @click="updateSegment" label="Создать категорию" class="btn-black-20-outlined font-light ml-2"/>
        <Button @click="updateSegment" label="Сохранить изменения" class="btn-primary font-light ml-2"/>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4">
        <MainCard title="Название сегмента">
          <InputText placeholder="Название *" v-model="form.name_ru"></InputText>
        </MainCard>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <BuildingCategoriesTable
            :categories="categories?.data?.data ?? []"
            :builder-id="building.id"
            :segment-id="segment.id"
        />

        <Paginator
            v-model:first="first"
            :rows="categories?.data?.pagination?.per_page ?? 0"
            :totalRecords="categories?.data?.pagination?.total ?? 0"
            class="justify-content-start"
        ></Paginator>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>