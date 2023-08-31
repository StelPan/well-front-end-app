<script>
import {defineComponent, ref} from "vue";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";

export default defineComponent({
  props: {
    services: {
      type: Array,
      required: true
    }
  },
  setup(props, {emit}) {
    const servicesList = ref(props.services);
    return {servicesList};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <span class="text-3xl font-bold">
      Доступные услуги
    </span>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-6" v-for="(service, i) in servicesList" :key="i">
        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 bg-white border-round-xl">
          <div class="w-9 sm:w-2rem xl:w-2rem block xl:block mx-auto ">
            <Checkbox
                :binary="true"
                v-model="service.set"
            />
          </div>
          <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1">
            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
              <div class="text-2xl font-bold">
                <span class="text-xl font-bold text-900">
                  {{ service.name_ru }}
                </span>
              </div>
              <div class="flex align-items-center gap-3">
                  <span class="flex align-items-center color-black-40 gap-2">
                    <span class="font-semibold" v-html="service.description_ru"></span>
                  </span>
              </div>
            </div>
            <div class="flex align-items-center sm:align-items-end sm:gap-2">
              <span class="color-black-80 text-xl font-bold">
                {{ service.cost }} Р.
              </span>
              <span class="font-bold color-black-20">
                / 1 час
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-2 mb-3">
    <span class="text-3xl font-bold">
      Разовые платежи
    </span>
  </section>

  <section class="py-2 mb-3">
    <div class="grid">
      <div class="col-12 md:col-6" v-for="(service, i) in servicesList" :key="i">
        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 bg-white border-round-xl">
          <div class="w-9 sm:w-2rem xl:w-2rem block xl:block mx-auto ">
            <Checkbox
                :binary="true"
                v-model="service.set"
            />
          </div>
          <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1">
            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
              <div class="text-2xl font-bold">
                <span class="text-xl font-bold text-900">
                  {{ service.name_ru }}
                </span>
              </div>
              <div class="flex align-items-center gap-3">
                  <span class="flex align-items-center color-black-40 gap-2">
                    <span class="font-semibold" v-html="service.description_ru"></span>
                  </span>
              </div>
            </div>
            <div class="flex align-items-center sm:align-items-end sm:gap-2">
              <span class="color-black-80 text-xl font-bold">
                {{ service.cost }} Р.
              </span>
              <span class="font-bold color-black-20">
                / 1 час
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>