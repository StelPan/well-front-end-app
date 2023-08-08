<script>
import { defineComponent, ref, watch } from "vue";
import Listbox from "primevue/listbox";

export default defineComponent({
  components: { Listbox },
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const selectedCountry = ref();

    const countries = ref([]);

    watch(() => props.countries, (state) => {
      countries.value = state;
    });

    return {
      selectedCountry,
      countries,
    }
  }
})
</script>

<template>
  <Listbox v-model="selectedCountry" @keydown.esc="selectedCountry = false" :options="countries" filter optionLabel="name" class="w-full md:w-14rem">

  </Listbox>
</template>
