<script>
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    state: {
      type: Boolean,
      required: true,
    }
  },
  setup() {
    const menus = [{
      label: "Пользователи",
      route: { name: "users" }
    }, {
      label: "Состояния",
      route: { name: "state-constructor" }
    }, {
      label: "Структура",
      route: { name: "login" }
    }, {
      label: "Объекты",
      route: { name: "login" }
    }, {
      label: "Тарифы",
      route: { name: "login" }
    }, {
      label: "Услуги",
      route: { name: "login" }
    }, {
      label: "Контрагенты",
      route: { name: "counterparties" }
    }, {
      label: "Отзывы",
      route: { name: "login" }
    }, {
      label: "Партнеры",
      route: { name: "login" }
    }, {
      label: "Уведомления",
      route: { name: "login" }
    }, {
      label: "Реквизиты",
      route: { name: "login" }
    }, {
      label: "Поддержка",
      route: { name: "login" }
    }];

    return { menus };
  }
});
</script>

<template>
<div
    :class="{'sidebar-close': !state, 'sidebar-show': state}"
    class="flex flex-column pb-4 bg-white"
>
  <div class="flex justify-content-center py-5 px-5">
    <div>
      <img src="../../assets/images/admin/Logotype.png" class="w-full">
    </div>
  </div>
  <div class="flex flex-column mb-2 px-3">
    <router-link :to="{ ...menu.route }" v-for="(menu, i) in menus" class="flex justify-content-start mb-4 color-black-80 no-underline" :key="i">
      <span class="">{{ menu.label }}</span>
    </router-link>
  </div>
</div>
</template>

<style scoped lang="scss">
.sidebar-close {
  max-width: 50px;
}

.sidebar-show {
  max-width: 300px;
}
</style>
