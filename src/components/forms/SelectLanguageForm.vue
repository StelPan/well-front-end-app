<script>
import { defineComponent, ref } from "vue";
import Listbox from "primevue/listbox";

export default defineComponent({
  components: { Listbox },
  setup() {
    const selectedCountry = ref();

    const countries = ref([
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ]);

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
