<script>
import {defineComponent, ref, watch} from "vue";
import {useStore} from "vuex";

import CountryFlagsImage from "@/plugins/country-flags-image";

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
      CountryFlagsImage,
    }
  }
})
</script>

<template>
  <div class="w-full">
    <div class="flex flex-column">
      <div class="px-4 mb-2">
        <span class="p-input-icon-left w-full">
        <i class="pi pi-search"/>
        <InputText v-model="writeCountry" class="w-full" placeholder="Поиск"/>
      </span>
      </div>

      <div>
        <DataView :value="countries">
          <template #list="slotProps">
            <div class="col-12 hover:bg-neutral cursor-pointer px-4" @click="toSelectedCountry(slotProps.data.id)">
              <div class="flex justify-content-start xl:flex-row xl:align-items-start py-3 gap-4">
                <div class="w-9 sm:w-4rem xl:w-2rem border-round flex align-items-center">
                  <img style="width: 25px" :src="CountryFlagsImage(slotProps.data.name)" alt="">
                </div>
                <div class="w-9 sm:w-4rem xl:w-3rem border-round flex justify-content-start align-items-center">
                  <span class="font-bold">{{ slotProps.data.phone_code }}</span>
                </div>

                <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                  <span class="font-bold">{{ slotProps.data.name }}</span>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.p-inputtext {
  border-width: 2px;
  border-radius: 17px !important;
}

</style>
