<script>
import {computed, defineComponent, onMounted} from "vue";
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
  setup() {
    const store = useStore();
    const route = useRoute();

    const locationTypes = computed(() => store.getters.getListTypeLocations);

    const loadLocationTypes = async () => {
      try {
        await store.dispatch('fetchTypeLocations');
      } catch (e) {
        console.error(e);
      }
    }

    onMounted(async () => {
      await loadLocationTypes();
    });

    return {locationTypes};
  },
})
</script>

<template>
  <ConfirmationModal :visible="true">
    <template #header>
      Удалить точку
    </template>

    <template #default>
      <span>Вы уверены, что хотите удалить точку ст.м. Балтийская</span>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Отмена" class="btn-black-20-outlined font-light w-full"/>
        <Button label="Удалить" class="btn-primary font-light ml-3 w-full"/>
      </div>
    </template>
  </ConfirmationModal>

  <section class="py-2 mb-3">
    <div class="flex justify-content-between align-items-center">
      <router-link
          :to="{name: 'buildings'}"
          class="color-black-80 font-bold no-underline text-3xl flex align-items-center"
      >
        <i class="pi pi-arrow-left text-1xl"></i>&nbsp;Редактирование
      </router-link>

      <Button label="Сохранить изменения" class="btn-primary" />
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-4" v-for="i in 5">
        <MainCard title="ст.м Балтийская">
          <template v-slot:title-action>
            <span class="color-error underline text-xl">Удалить точку</span>
          </template>

          <div class="grid gap-3">
            <div class="col-12">
              <div class="w-full">
              <span class="p-float-label w-full">
                <InputText
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