<script>
import {defineComponent, ref, onMounted, watch} from "vue";

import Button from "primevue/button";

export default defineComponent({
  components: {Button},
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    defaultTabSwitch: {
      type: Object,
      required: false,
    }
  },
  setup(props, {emit}) {
    const switcher = ref(props.tabs.map(tab => {
      return {...tab, toggle: false};
    }))

    const defaultTab = ref(props.defaultTabSwitch);
    onMounted(() => {
      for (let s of switcher.value) {
        if (s.type === defaultTab.value.type)
          s.toggle = true;

      }
    })

    const toggleSwitch = (tab) => {
      for (let s of switcher.value) {
        s.toggle = false;
      }

      for (let s of switcher.value) {
        if (s.label === tab.label) {
          s.toggle = true;
        }
      }

      emit('toggleTab', tab);
    }

    return {switcher, toggleSwitch};
  }
});
</script>

<template>
  <div class="grid justify-content-between">
    <Button
        v-for="(item, i) in switcher"
        @click="toggleSwitch(item)"
        :key="i"
        class="btn-primary"
        :class="{ 'btn-primary-outlined': item.toggle }"
        rounded
    >
      {{ item.label }}
    </Button>
  </div>
</template>


<style scoped>

</style>