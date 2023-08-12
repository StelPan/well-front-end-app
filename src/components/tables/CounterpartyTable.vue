<script>
import {defineComponent, ref} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    counterparties: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const reactiveCounterparties = ref(props.counterparties);

    return {reactiveCounterparties};
  },
});
</script>

<template>

</template>

<style scoped>

</style>