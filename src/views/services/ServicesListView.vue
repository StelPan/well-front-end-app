<script>
import {defineComponent, computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import Button from "primevue/button";
import DataView from "primevue/dataview";

export default defineComponent({
  layout: { name: 'AdminLayout'},
  components: {Button, DataView},
  setup() {
    const store = useStore();
    const route = useRoute();

    const first = ref(0);
    const services = computed(() => store.getters.getListServices);

    const loadServices = async () => {
      await store.dispatch('fetchServices', {
        type: route.params.type,
        page: ((first.value / (services.value?.data?.pagination?.per_page ?? 1)) + 1)
      });

      window.scrollTo(0,0);
    };

    watch(
        () => route.params.type,
        async (type) => {
          if (!type) return;
          await loadServices()
        }
    );

    onMounted(async () => {
      await store.dispatch('fetchServices');
    });

    return {services};
  }
});

</script>

<template>
  <section class="py-2 mb-3">
    <DataView :value="services?.data?.data ?? []">
      <template #list="slotProps">
        <div class="col-12">
          <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
            <img
                class="w-9 sm:w-16rem xl:w-14rem shadow-2 block xl:block mx-auto border-round"
                :src="slotProps.data.photo.original_url"
                :alt="slotProps.data.service_name"
            />
            <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
              <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                <div class="text-2xl font-bold text-900">
                  <router-link class="color-primary" :to="{name: 'service-view', params: {id: slotProps.data.id}}">
                    {{ slotProps.data.name_ru }}
                  </router-link>
                </div>
                <div class="flex align-items-center xl:w-5 gap-3">
                      <span class="flex align-items-center color-black-40 gap-2">
                        <span class="font-semibold" v-html="slotProps.data.description_ru"></span>
                      </span>
                </div>
              </div>
              <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                  <span v-if="slotProps.data.cost" class="color-black-80 text-xl font-bold">
                    {{ slotProps.data.cost }} Р.
                  </span>
                <span v-else class="color-black-80 text-xl font-bold">
                    Стоимость, Р
                  </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </section>
</template>

<style scoped>

</style>