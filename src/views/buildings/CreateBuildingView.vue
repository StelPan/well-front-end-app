<script>
import {computed, defineComponent, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useError} from "@/hooks/useErrors";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import TabMenu from "primevue/tabmenu";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import Breadcrumb from "@/components/Breadcrumb";
import MainCard from "@/components/cards/MainCard";

import AttractionTabView from "@/views/buildings/tabs/AttractionTabView";
import DescriptionTabView from "@/views/buildings/tabs/DescriptionTabView";
import ImprovementTabView from "@/views/buildings/tabs/ImprovementTabView";
import InfrastructureTabView from "@/views/buildings/tabs/InfrastructureTabView";
import LocationTabView from "@/views/buildings/tabs/LocationTabView";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {
    Button, ButtonSuccess, Breadcrumb, InputText, Dropdown, MainCard, TabMenu,
    AttractionTabView, DescriptionTabView, ImprovementTabView, InfrastructureTabView, LocationTabView
  },
  setup() {
    const store = useStore();
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

    const tabs = ref([
      {label: 'Описание', component: 'DescriptionTabView'},
      {label: 'Инфраструктура', component: 'InfrastructureTabView'},
      {label: 'Благоустройство', component: 'ImprovementTabView'},
      {label: 'Расположение', component: 'LocationTabView'},
      {label: 'Достопримечательности', component: 'AttractionTabView'}
    ]);

    const activeTabIndex = ref(0);

    const isCreated = ref(false);

    const activeTab = computed(() => {
      return tabs.value[activeTabIndex.value];
    });

    const breadcrumbs = ref([
      {label: 'Структура', router: {name: 'buildings'}},
      {label: 'Создание здания'}
    ]);

    const toCreateBuilding = async () => {
      try {
        await store.dispatch('fetchCreateBuilding', form.value);
        isCreated.value = true;
      } catch (e) {
        errors.setErrors(e.response.data.errors);
      }
    };

    const updateFormData = (formData) => {
      form.value = formData;
    }

    watch(
        form,
        () => isCreated.value = false
    );

    return {
      breadcrumbs,
      form,
      tabs,
      activeTabIndex,
      activeTab,
      toCreateBuilding,
      updateFormData,
      isCreated,
      errors: errors.errors,
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/" />
      <ButtonSuccess v-if="isCreated" label="Здание создано" />
      <Button v-if="!isCreated" @click="toCreateBuilding" label="Создать здание" class="btn-primary font-light" />
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="flex justify-content-start">
      <TabMenu v-model:activeIndex="activeTabIndex" :model="tabs" />
    </div>
  </section>

  <component
      :formData="form"
      :errors="errors"
      :is="activeTab.component"
      @changeFormData="updateFormData"
  />
</template>