<script>
import {defineComponent, ref, onMounted, computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from 'vue-router';
import {useNotices} from "@/hooks/notices";

import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Paginator from "primevue/paginator";
import NoticesTable from "@/components/tables/NoticesTable";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, Dropdown, NoticesTable, Paginator},
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadNotices, loadTypeNotices} = useNotices();
      await Promise.all([loadNotices(), loadTypeNotices()]);
    } catch (e) {
      console.error(e);
    }

    next();
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const {notices, typeNotices: types, loadNotices} = useNotices();

    const first = ref(0);

    const selectType = ref('');

    const filterNotices = async () => {
      const filterObject = {
        page: ((first.value / (notices.value?.data?.pagination?.per_page ?? 1)) + 1),
      };

      if (selectType.value) {
        filterObject['type'] = selectType.value.id;
      }

      await loadNotices(filterObject);
    };

    const toNoticeCreate = async () => {
      await router.push({name: 'notice-create'});
    };

    watch((first), async () => {
      await loadNotices();
    });

    watch((selectType), async () => {
      await loadNotices();
    });

    return {types, selectType, notices, toNoticeCreate, first};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1>Уведомления</h1>

      <div class="flex gap-3">
        <Dropdown
            v-model="selectType"
            :options="types"
            optionLabel="name"
            placeholder="Тип уведомления"
            class="w-full md:w-14rem border-radius-15"
        />
        <Button label="Создать уведомление" @click="toNoticeCreate" class="btn-primary font-light w-12"/>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12">
        <NoticesTable
            v-if="notices?.data?.data"
            :notices="notices?.data?.data"
            :type-notices="types"
        />

        <Paginator
            v-model:first="first"
            :rows="notices?.data?.pagination?.per_page ?? 0"
            :totalRecords="notices?.data?.pagination?.total ?? 0"
            class="justify-content-start"
        ></Paginator>
      </div>
    </div>
  </section>
</template>