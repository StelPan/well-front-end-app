<script>
import {defineComponent, ref} from "vue";

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
    const style = ref({ textStyles: 'text-3xl' });
    return {style};
  }
})
</script>

<template>
  <div class="flex">
    <template v-for="(item, i) in data" :key="i">
      <template v-if="item?.router">
        <router-link class="color-primary" :class="{ [style.textStyles]: true }" v-if="item?.router" :to="item.router">
          {{ item.label }}
        </router-link>
        <template v-if="i !== data.length - 1">
          <span :class="{ [style.textStyles]: true }">&nbsp;{{ separator }}&nbsp;</span>
        </template>
      </template>

      <span v-else :class="{ [style.textStyles]: true }">
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
