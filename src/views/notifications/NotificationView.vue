<script>
import {defineComponent, ref} from "vue";
import {useStore} from "vuex";

import Breadcrumb from "@/components/Breadcrumb";

export default defineComponent({
  layout: {name: "AdminLayout"},
  components: {Breadcrumb},
  setup() {
    const notification = ref(
        { title: 'Второе', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae esse eveniet totam vero. Earum inventore laudantium sunt veritatis voluptates! Accusantium adipisci aspernatur consequatur earum, ipsa itaque libero neque rerum ullam!"}
    );

    const breadcrumbs = ref([{
      label: 'Уведомления',
      router: { name: 'notifications' }
    }, {
      label: notification.value.title
    }]);

    return {notification, breadcrumbs};
  }
});
</script>

<template>
  <section class="py-2 mb-2">
    <div class="flex">
      <Breadcrumb :data="breadcrumbs" separator="/" />
    </div>
  </section>

  <section class="py-2 mb-2">
    <div class="grid">
      <div class="col-12 md:col-6">
        {{ notification.text }}
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>