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
      to: "login"
    }, {
      label: "Состояния",
      to: "login"
    }, {
      label: "Структура",
      to: "login"
    }, {
      label: "Объекты",
      to: "login"
    }, {
      label: "Тарифы"
    }, {
      label: "Услуги",
      to: "login"
    }, {
      label: "Контрагенты",
      to: "login"
    }, {
      label: "Отзывы",
      to: "login"
    }, {
      label: "Партнеры",
      to: "login"
    }, {
      label: "Уведомления",
      to: "login"
    }, {
      label: "Реквизиты",
      to: "login"
    }, {
      label: "Поддержка",
      to: "login"
    }];

    return { menus };
  }
});
</script>

<template>
<div
    :class="{'sidebar-close': !state, 'sidebar-show': state}"
    class="flex flex-column pb-4"
>
  <div class="flex justify-content-center py-5 px-5">
    <div>
      <img src="../../assets/images/admin/Logotype.png" class="w-full">
    </div>
  </div>
  <div class="flex flex-column mb-2 px-3">
    <div v-for="(menu, i) in menus" class="flex justify-content-start mb-4" :key="i">
      <span class="">{{ menu.label }}</span>
    </div>
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
