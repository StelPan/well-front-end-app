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
<div class="flex flex-column pt-4">
  <div class="flex justify-content-center mb-2">
    <div class="mx-3">
      <img src="../../assets/images/admin/Logotype.png" class="w-full">
    </div>
  </div>
  <div class="flex flex-column mb-2">
    <div v-for="(menu, i) in menus" class="flex justify-content-between" :key="i">
      {{ menu.label }}
    </div>
  </div>
</div>
</template>
