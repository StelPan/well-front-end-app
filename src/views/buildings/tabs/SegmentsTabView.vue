<script>
import {defineComponent} from "vue";

import BuildingSegmentsTable from "@/components/tables/BuildingSegmentsTable.vue";
export default defineComponent({
  components: {BuildingSegmentsTable},
  props: {
    segments: {
      type: Array,
      required: true,
    }
  }
});
</script>

<template>
  <BuildingSegmentsTable :segments="segments" />
</template>