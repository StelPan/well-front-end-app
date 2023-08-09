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
  setup(props) {
    const visible = ref(props.visible);

    const countries = ref([]);

    const closeModal = () => visible.value = false;

    watch(() => props.visible, (state) => {
      visible.value = state;
    });

    watch(() => props.countries, (state) => {
      countries.value = state;
    });

    return {
      closeModal,
      visible,
      countries,
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
        <SelectLanguageForm @selectedCountry="closeModal" :countries="countries" />
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
