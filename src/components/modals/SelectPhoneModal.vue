<script>
import {defineComponent, ref, watch} from "vue";
import Dialog from "primevue/dialog";
import SelectLanguageForm from "@/components/forms/SelectLanguageForm.vue";

export default defineComponent({
  name: "SelectPhoneModal",
  components: {
    SelectLanguageForm,
    Dialog
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    countries: {
      type: Array,
      required: true,
    }
  },
  setup(props, { emit }) {
    const countries = ref([]);

    watch(() => props.countries, (state) => {
      countries.value = state;
    });

    const closeModalEvent = () => emit('toggleCloseModal', true);

    return {
      countries,
      closeModalEvent,
    };
  }
});
</script>

<template>
  <Dialog
      :visible="visible"
      modal
      :close-on-escape="true"
      :closable="false"
      :style="{ width: '50vw', 'border-radius': '20px' }"
  >
    <template #default>
      <div class="flex justify-content-center py-2">
        <SelectLanguageForm
            @selectedCountry="closeModalEvent"
            :countries="countries"
        />
      </div>
    </template>

    <template #header>
      Выберите страну
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
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
