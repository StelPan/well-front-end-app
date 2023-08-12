<script>
import {defineComponent, ref, onMounted} from "vue";

import NotificationCard from "@/components/cards/NotificationCard";

export default defineComponent({
  layout: { name: 'AdminLayout' },
  components: {NotificationCard},
  setup() {

    // const loadNotification = await store.dispatch('fetchNotifications');
    // console.log(store.getters.getNotificationsList);
    const notifications = ref([
      { title: 'Первое', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae esse eveniet totam vero. Earum inventore laudantium sunt veritatis voluptates! Accusantium adipisci aspernatur consequatur earum, ipsa itaque libero neque rerum ullam!"},
      { title: 'Второе', text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae esse eveniet totam vero. Earum inventore laudantium sunt veritatis voluptates! Accusantium adipisci aspernatur consequatur earum, ipsa itaque libero neque rerum ullam!"}
    ]);

    return { notifications};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex">
      <h1>Уведомления</h1>
    </div>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-6" v-for="(notification, i) in notifications">
        <NotificationCard>
          <template #subtitle>
            <span>{{ notification.title }}</span>
            <i class="pi pi-check ml-1 color-primary" style="font-size: 1rem"></i>
          </template>

          <template #content>
            <div class="flex flex-column">
              <span class="mb-2">{{ notification.text }}</span>
              <router-link class="color-primary" :to="{ name: 'notification-view', params: { id: i } }">
                Подробнее
              </router-link>
            </div>
          </template>
        </NotificationCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.p-card {
  border-radius: 8px;
  box-shadow: none;
}
</style>