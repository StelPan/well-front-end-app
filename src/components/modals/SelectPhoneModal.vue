<script>
import {defineComponent, ref, watch, computed} from "vue";
import Dialog from "primevue/dialog";
import SelectLanguageForm from "@/components/forms/SelectLanguageForm.vue";

export default defineComponent({
  name: "SelectPhoneModal",
  components: {
    SelectLanguageForm,
    Dialog
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    countries: {
      type: Array,
      required: true,
    }
  },
  setup(props, { emit }) {

    const value = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })

    return {value};
  }
});
</script>

<template>
  <Dialog
      v-model:visible="value"
      modal
      :close-on-escape="true"
      :style="{ 'max-width': '400px', 'border-radius': '25px' }"
  >
    <template #default>
      <div class="flex justify-content-center">
        <SelectLanguageForm @selectedCountry="value = false" :countries="countries" />
      </div>
    </template>

    <template #header>
      Выберите страну
    </template>
  </Dialog>
</template>

<style module lang="scss">
.p-dialog-header-icons {
  display: none;
}

.p-dialog-content {
  padding: 0 !important;
}

.rounded {
  border-radius: 20px !important;
}
</style>
