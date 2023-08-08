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
    const visible = ref(false);
    const countries = ref([]);

    watch(() => props.visible, (state) => {
      visible.value = state;
    });

    watch(() => props.countries, (state) => {
      countries.value = state;
    });

    return {
      visible,
      countries,
    };
  }
});
</script>

<template>
  <Dialog :visible="visible" modal header="Выберите страну" >
    <div class="flex justify-content-center">
      <SelectLanguageForm :countries="countries" />
    </div>
  </Dialog>
</template>
