<script>
import {defineComponent, ref} from "vue";

import FileUpload from "primevue/fileupload";
import Button from "primevue/button";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    }
  },
  setup() {
    const upload = ref();
    return {upload};
  }
});
</script>

<template>
  <FileUpload ref="upload"  />
  <Button :label="label" @click="console.log(upload)" class="btn-primary font-light" />
</template>