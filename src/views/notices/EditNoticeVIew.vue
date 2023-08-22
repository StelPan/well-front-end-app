<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Breadcrumb from "@/components/Breadcrumb.vue";

export default defineComponent({
  layout: {name: "AdminLayout"},
  components: {Breadcrumb, Button, InputText},
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const breadcrumbs = ref([]);
    const notice = computed(() => store.getters.getCurrentNotice);
    const roles = computed(() => store.getters.getRolesList);
    const typeNotices = computed(() => store.getters.getListTypeNotices);

    onMounted(async () => {
      await store.dispatch('fetchNotice', route.params.id);
      await store.dispatch('fetchTypeNotices');
      await store.dispatch('fetchRoles');

      breadcrumbs.value = [
        {label: 'Уведомления', router: {name: 'notices'}},
        {label: notice.value.title}
      ];
    })

    return {breadcrumbs, roles, typeNotices, notice};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <Breadcrumb :data="breadcrumbs" separator="/"/>

      <div class="flex">
        <Button label="Удалить черновик" @click="decline" class="btn-error-outlined font-light" />
        <Button label="Запланировать отправку" @click="confirm" class="btn-primary font-light ml-3" />
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">

  </section>
</template>