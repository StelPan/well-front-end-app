<script>
import {defineComponent} from "vue";
import {useStore} from "vuex";

import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Breadcrumb from "@/components/Breadcrumb.vue";
export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Breadcrumb, Button, Dropdown, InputText, Checkbox},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();

    } catch (e) {
      console.error(e);
    }
  },
  setup() {
  },
})
</script>

<template>

</template>

<style scoped>

</style>