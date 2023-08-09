<script>
import {defineComponent, ref, watch} from "vue";
import {useStore} from "vuex";

import InputText from "primevue/inputtext";
import DataView from "primevue/dataview";

export default defineComponent({
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },
  components: {
    InputText,
    DataView,
  },
  setup(props, { emit }) {
    const store = useStore();

    const selectedCountry = ref();

    const writeCountry = ref('');

    const countries = ref(props.countries);

    const toSelectedCountry = function (id) {
      store.commit('selectCountry', id);
      emit('selectedCountry');
    }

    watch(() => props.countries, (state) => {
      countries.value = state;
    });

    watch(writeCountry, (country) => {
      store.commit('filterCountriesList', country);
    });

    return {
      toSelectedCountry,
      selectedCountry,
      countries,
      writeCountry,
    }
  }
})
</script>

<template>
  <div class="w-full">
    <div class="flex flex-column">
      <div class="px-2 mb-2">
        <span class="p-input-icon-left w-full">
        <i class="pi pi-search"/>
        <InputText v-model="writeCountry" class="w-full" placeholder="Поиск"/>
      </span>
      </div>

      <div class="h-max overflow-x-hidden">
        <DataView :value="countries">
          <template #list="slotProps">
            <div class="col-12 cursor-pointer" @click="toSelectedCountry(slotProps.data.id)">
              <div class="hover:bg-neutral flex justify-content-start xl:flex-row xl:align-items-start p-4 gap-4">
                <div class="w-9 sm:w-4rem xl:w-5rem border-round">
                  {{ slotProps.data.phone_code }}
                </div>

                <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                  <span>{{ slotProps.data.name }}</span>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.p-inputtext {
  padding: 1rem 2rem;
  border-width: 2px ;
  border-radius: 17px !important;
}
</style>
