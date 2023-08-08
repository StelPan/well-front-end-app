<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="card flex justify-content-center">
      <Button label="Check" icon="pi pi-check" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Button from 'primevue/button';

export default {
  name: 'HomeView',
  layout: {
    name: 'AdminLayout',
  },
  components: {
    HelloWorld,
    Button,
  }
}
</script>
