<script>
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    separator: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    } // { label: '', route: {} }
  },
  setup() {

  }
})
</script>

<template>
  <div class="flex">
    <template v-for="(item, i) in data" :key="i">
      <router-link class="color-primary" v-if="item?.router" :to="item.router">
        {{ item.label }}
        <template v-if="i !== data.length - 1">
          {{ separator }}&nbsp;
        </template>
      </router-link>

      <span v-else>
        {{ item.label }}
        <template v-if="i !== data.length - 1">
          {{ separator }}&nbsp;
        </template>
      </span>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>
