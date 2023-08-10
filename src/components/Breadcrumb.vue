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
    <span v-for="(item, i) in data">

    </span>
  </div>
</template>

<style scoped lang="scss">

</style>
