<script>
import {defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter, useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

import Button from "primevue/button";
import TabMenu from "primevue/tabmenu";
import TariffsTable from "@/components/tables/TariffsTable";

const DAILY_TYPE = 'daily';
const HOURLY_TYPE = 'hourly';
const MONTHLY_TYPE = 'monthly';

const TARIFF_NAMES = {
  [MONTHLY_TYPE]: 'Долгосрочные',
  [DAILY_TYPE]: 'Краткосрочные (суточные)',
  [HOURLY_TYPE]: 'Краткосрочные (часовые)',
};

export default defineComponent({
  layout: {name: "AdminLayout"},
  components: {TariffsTable, Button, TabMenu},
  async beforeRouteEnter (to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('fetchTypeTariffs');
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const {t} = useI18n();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const typesTariffItems = ref([]);
    const fillTypeTariffItems = () => {
      let tariffs = [];
      for (let period of store.getters.getListTypeTariffs) {
        tariffs.push({
          label: TARIFF_NAMES[period.name],
          to: `/tariffs/list/${period.name}`
        });
      }

      typesTariffItems.value = tariffs;
    };

    const toCreateTariff = async () => {
      await router.push({ name: 'tariff-create' });
    };

    onMounted(async () => {
      fillTypeTariffItems();

      if (!route.params?.period) {
        await router.push({ name: 'tariffs-periods-list', params: {period: MONTHLY_TYPE}});
      }
    });

    return {typesTariffItems, toCreateTariff, t};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>{{ t('menu.tariffs') }}</h1>
      <Button :label="t('labels.tariff-create')" @click="toCreateTariff" class="btn-primary font-light" />
    </div>
  </section>
  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <TabMenu :model="typesTariffItems" />
      </div>
    </div>
  </section>

  <router-view></router-view>
</template>

<style scoped>

</style>