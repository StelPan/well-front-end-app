<script>
import {defineComponent, ref, onMounted, computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from 'vue-router';

import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import NoticesTable from "@/components/tables/NoticesTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, Dropdown, NoticesTable},
  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(async () => {
      await store.dispatch('fetchTypeNotices');
    });

    const notices = ref([]);

    const types = computed(() => store.getters.getListTypeNotices);

    const selectType = ref('');

    return {types, selectType, notices};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Уведомления</h1>

      <div class="flex gap-3">
        <Dropdown
            v-model="selectType" :options="types"
            optionLabel="name_ru"
            placeholder="Тип уведомления"
            class="w-full md:w-14rem border-radius-15"
        />
        <Button label="Создать уведомление" class="btn-primary font-light w-12" />
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <NoticesTable :notices="[]" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>