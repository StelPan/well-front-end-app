<script>
import {defineComponent, watch, ref, computed} from "vue";

import InputText from "primevue/inputtext";

import LoadImageCountryPlugin from "@/plugins/country-flags-image";

export default defineComponent({
  components: {InputText},
  props: {
    country: {
      type: String,
    },
    phoneCode: {
      type: String,
    },
    modelValue: String,
  },
  setup(props, {emit}) {
    const phone = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    const toggleChangePhoneCode = () => {
      emit('toggleChangePhoneCode', true);
    };

    const source = ref("");

    source.value = LoadImageCountryPlugin();

    watch(
        () => props.country,
        (val) => {
          source.value = LoadImageCountryPlugin(val);
        }
    )
    return {source, phone, toggleChangePhoneCode};
  }
});

</script>

<template>
      <span class="p-input-icon-left p-float-label w-full">
        <i
            @click="toggleChangePhoneCode"
            class="icon-number flex align-items-center left-0 cursor-pointer color-black-80"
        >
          <img width="20" :src="source" alt="">
          <span>{{ phoneCode }}</span>
        </i>
        <InputText
            id="phone"
            class="w-full color-black-80"
            style="font-family: 'RF Dewi', sans-serif;"
            :style="`padding-left:${2.5   + (phoneCode.length) / 2}em !important`"
            v-model="phone"
        />
        <label
            :style="`padding-left:${1.5   + (phoneCode.length) / 2}em !important`"
            class="left-number-label"
            for="phone"
        >Контактный телефон</label>
      </span>
</template>

<style>
.icon-number {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-style: normal;
  margin: -11px -1px 0 15px !important;
  top: 52.5% !important;
}

.left-number-label {
  left: 3.5rem;
}
</style>