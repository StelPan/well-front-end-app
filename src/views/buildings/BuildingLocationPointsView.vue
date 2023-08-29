<script>
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import MainCard from "@/components/cards/MainCard.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import ConfirmationModal from "@/components/modals/ConfirmationModal.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {MainCard, Dropdown, InputText, Breadcrumb, Button, ConfirmationModal},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      const route = useRoute();
      await store.dispatch('fetchBuilding', route.params.id);
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const building = computed(() => store.getters.getCurrentBuilding);
    const locationTypes = computed(() => store.getters.getListTypeLocations);

    const visible = ref(false);
    const points = ref(building.value.location_points);
    const destroyPoint = ref(null);

    const showModalDestroyPoint = (point) => {
      destroyPoint.value = point;
      visible.value = true;
    }

    const loadLocationTypes = async () => {
      try {
        await store.dispatch('fetchTypeLocations');
      } catch (e) {
        console.error(e);
      }
    };

    const updatePointHandler = async (point) => {
      // TODO: ДОБАВИТЬ ЗАПРОС НА ОБНОВЛЕНИЕ ТОЧКИ
    };

    const destroyPointHandler = async () => {
      // TODO: ДОБАВИТЬ ЗАПРОС НА УДАЛЕНИЕ ТОЧКИ
      points.value = points.value.filter(point => point.id !== destroyPoint.value.id);
      visible.value = false;
    };

    onMounted(async () => {
      await loadLocationTypes();
    });

    return {
      locationTypes, building, visible, points, destroyPoint,
      destroyPointHandler, updatePointHandler, showModalDestroyPoint
    };
  },
})
</script>

<template>
  <ConfirmationModal v-model:visible="visible">
    <template #header>
      Удалить точку
    </template>

    <template #default>
      <span v-if="destroyPoint">
        Вы уверены, что хотите удалить точку {{ destroyPoint.name_ru }}
      </span>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <Button @click="visible = false" label="Отмена" class="btn-black-20-outlined font-light w-full"/>
        <Button @click="destroyPointHandler" label="Удалить" class="btn-primary font-light ml-3 w-full"/>
      </div>
    </template>
  </ConfirmationModal>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between align-items-center">
      <router-link
          :to="{name: 'building-edit', params: {id: building.id}}"
          class="color-black-80 font-bold no-underline text-3xl flex align-items-center"
      >
        <i class="pi pi-arrow-left text-1xl"></i>&nbsp;Редактирование
      </router-link>

      <Button label="Сохранить изменения" class="btn-primary"/>
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4" v-for="point in points">
        <MainCard :title="point.name_ru">
          <template v-slot:title-action>
            <span
                @click="showModalDestroyPoint(point)"
                class="color-error underline text-xl cursor-pointer"
            >Удалить точку</span>
          </template>

          <div class="grid gap-3">
            <div class="col-12">
              <div class="w-full">
              <span class="p-float-label w-full">
                <InputText
                    v-model="point.name_ru"
                    id="last_name"
                    class="w-full"
                />
                <label for="last_name">Название точки *</label>
              </span>
                <!--            <span v-if="errors?.last_name" class="text-xs color-error">-->
                <!--              {{ errors.last_name[0] }}-->
                <!--            </span>-->
              </div>
            </div>
            <div class="col-12">
              <div class="w-full">
              <span class="p-float-label w-full">
                <InputText
                    v-model="point.address_ru"
                    id="last_name"
                    class="w-full"
                />
                <label for="last_name">Адрес точки *</label>
              </span>
                <!--            <span v-if="errors?.last_name" class="text-xs color-error">-->
                <!--              {{ errors.last_name[0] }}-->
                <!--            </span>-->
              </div>
            </div>
            <div class="col-12">
              <div class="w-full">
              <span class="p-float-label w-full">
                <InputText
                    v-model="point.lat"
                    id="last_name"
                    class="w-full"
                />
                <label for="last_name">Широта точки *</label>
              </span>
                <!--            <span v-if="errors?.last_name" class="text-xs color-error">-->
                <!--              {{ errors.last_name[0] }}-->
                <!--            </span>-->
              </div>
            </div>
            <div class="col-12">
              <div class="w-full">
              <span class="p-float-label w-full">
                <InputText
                    v-model="point.lon"
                    id="last_name"
                    class="w-full"
                />
                <label for="last_name">Долгота точки *</label>
              </span>
                <!--            <span v-if="errors?.last_name" class="text-xs color-error">-->
                <!--              {{ errors.last_name[0] }}-->
                <!--            </span>-->
              </div>
            </div>
            <div class="col-12">
              <div class="w-full">
                <Dropdown
                    :options="locationTypes"
                    optionLabel="name_ru"
                    optionValue="id"
                    placeholder="Тип точки"
                    class="w-full"/>
              </div>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  </section>
</template>