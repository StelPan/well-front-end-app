<script>
import {computed, defineComponent, onMounted} from "vue";
import {useStore} from "vuex";

import BanksTable from "@/components/tables/BanksTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {BanksTable},
  setup() {
    const store = useStore();

    const banks = computed(() => store.getters.getListBanks);

    onMounted(async () => {
      await store.dispatch('fetchBanks');
    });

    return {banks};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="grid gap-2">
      <div class="col-12">
        <BanksTable :banks="banks.data ?? []" />
      </div>
    </div>
  </section>
</template>
