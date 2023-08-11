<script>
import {defineComponent, ref} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  components: {DataTable, Column},
  props: {
    states: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const reactiveStates = ref(props.states);

    return {reactiveStates};
  }
})
</script>

<template>
  <DataTable :value="reactiveStates" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
  </DataTable>
</template>

<style scoped lang="scss">

</style>
