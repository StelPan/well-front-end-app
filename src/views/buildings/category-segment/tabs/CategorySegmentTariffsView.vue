<script>
import {computed, defineComponent, ref} from "vue";

import DataView from "primevue/dataview";
import Checkbox from "primevue/checkbox";

export default defineComponent({
  components: {DataView, Checkbox},
  props: {
    tariffs: {
      type: Array,
      required: true,
    }
  },
  setup(props, {emit}) {
    const tariffsList = ref(props.tariffs);

    const dailyTariffs = computed(() => tariffsList.value.filter(tariff => tariff.period === 'daily'));
    const monthlyTariffs = computed(() => tariffsList.value.filter(tariff => tariff.period === 'monthly'));

    const touchTariff = (id) => {
      const tariff = tariffsList.value.find(t => t.id === id);
      emit('toggleTouchTariff', {id, set: !tariff.set});
    };

    return {dailyTariffs, monthlyTariffs, touchTariff};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <span class="text-3xl font-bold">Долгосрочные тарифы</span>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-6" v-for="(tariff, i) in monthlyTariffs" :key="i">
        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 bg-white border-round-xl">
          <div class="w-9 sm:w-2rem xl:w-2rem block xl:block mx-auto ">
            <Checkbox
                @click="touchTariff(tariff.id)"
                :binary="true"
                v-model="tariff.set"
            />
          </div>
          <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1">
            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
              <div class="text-2xl font-bold">
                <span class="text-xl font-bold text-900">
                  {{ tariff.name_ru }}
                </span>
              </div>
              <div class="flex align-items-center gap-3">
                  <span class="flex align-items-center color-black-40 gap-2">
                    <span class="font-semibold" v-html="tariff.description_ru"></span>
                  </span>
              </div>
            </div>
            <div class="flex align-items-center sm:align-items-end sm:gap-2">
              <span class="color-black-80 text-xl font-bold">
                {{ tariff.cost }} Р.
              </span>
              <span class="font-bold color-black-20">
                / 30 суток
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <span class="text-3xl font-bold">Краткосрочные тарифы</span>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-6" v-for="(tariff, i) in dailyTariffs" :key="i">
        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 bg-white border-round-xl">
          <div class="w-9 sm:w-2rem xl:w-2rem block xl:block mx-auto ">
            <Checkbox
                @click="touchTariff(tariff.id)"
                :binary="true"
                v-model="tariff.set"
            />
          </div>
          <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1">
            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
              <div class="text-2xl font-bold">
                <span class="text-xl font-bold text-900">
                  {{ tariff.name_ru }}
                </span>
              </div>
              <div class="flex align-items-center gap-3">
                  <span class="flex align-items-center color-black-40 gap-2">
                    <span class="font-semibold" v-html="tariff.description_ru"></span>
                  </span>
              </div>
            </div>
            <div class="flex align-items-center sm:align-items-end sm:gap-2">
              <span class="color-black-80 text-xl font-bold">
                {{ tariff.cost }} Р.
              </span>
              <span class="font-bold color-black-20">
                / 1 час
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>

</style>