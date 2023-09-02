<script>
import {computed, defineComponent, ref} from "vue";

import Button from "primevue/button";

export default defineComponent({
  components: {Button},
  props: {
    items: {
      type: Object,
      required: true,
    }
  },
  setup(props, {emit}) {
    const pickers = ref(props.items);

    const pick = (i) => {
      pickers.value[i].pick = !pickers.value[i].pick;
    };

    const classMethods = {
      btnPicker(prev, curr, next) {
        if (prev && next) {
          if (curr.pick && !prev.pick && !next.pick) {
            return true;
          }
        }

        if (!prev) {
          if (!next.pick && curr.pick) {
            return true;
          }
        }

        if (!next) {
          if (!prev.pick && curr.pick) {
            return true;
          }
        }

        return false;
      },
      btnLeft(prev, curr, next) {
        if (next) {
          if (next.pick && curr.pick) {
            return true
          }
        }

        return false;
      },
      btnRight(prev, curr, next) {
        if (prev) {
          if (prev.pick && curr.pick) {
            return !this.btnPickerNonRadius(prev, curr, next)
          }
        }

        return false;
      },
      btnPickerNonRadius(prev, curr, next) {
        if (prev && next) {
          if (curr.pick && prev.pick && next.pick) {
            return true;
          }
        }

        return false;
      }
    }

    return {pickers, pick, classMethods};
  }
});
</script>

<template>
  <div class="flex">
    <Button
        v-for="(i, a) in pickers"
        :class="{
          'btn-picker btn-belge': classMethods.btnPicker(pickers[a - 1], i, pickers[a + 1]),
          'btn-picker-left btn-belge': classMethods.btnLeft(pickers[a - 1], i, pickers[a + 1]),
          'btn-picker-right btn-belge': classMethods.btnRight(pickers[a - 1], i, pickers[a + 1]),
          'btn-picker-non-radius btn-belge': classMethods.btnPickerNonRadius(pickers[a - 1], i, pickers[a + 1])
        }"
        class="btn-non-background flex align-items-center justify-content-between"
        @click="pick(a)"
    >
      {{i.label}}
    </Button>
  </div>
</template>

<style>
.btn-picker {
  border-radius: 15px !important;
}

.btn-picker-left {
  border-top-left-radius: 15px !important;
  border-bottom-left-radius: 15px !important;
}

.btn-picker-non-radius {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.btn-picker-right {
  border-top-right-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
}

.btn-picker-full {
  border-radius: 15px !important;
}
</style>