<script>
import {defineComponent, watchEffect, onMounted} from "vue";
import {useTimer} from "vue-timer-hook";

export default defineComponent({
  props: {
    minutes: {
      type: Number,
      required: true,
    },
    restart: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    let time = new Date();
    time.setSeconds(time.getSeconds() + props.minutes * 60);

    const timer = useTimer(time);

    onMounted(() => {
      watchEffect(() => {
        if (timer.isExpired.value) {
          emit('expiredTimeEvent', timer.isExpired.value);
        }
      })
    });

    const restartFire = () => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + props.minutes * 60);
      timer.restart(time);
    }

    return {
      timer,
    }
  }
})
</script>

<template>
  <i class="pi">
      <span class="m-0 p-0 text-black-alpha-90">
        {{ timer.minutes }}:{{ timer.seconds }}
      </span>
  </i>
</template>
