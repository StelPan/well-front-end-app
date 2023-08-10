<script>
import { defineComponent } from "vue";
import AdminSidebar from "@/components/sidebars/AdminSidebar.vue";
import Menu from "@/components/menubar/Menu.vue";

export default defineComponent({
  name: "AdminLayout",
  components: {AdminSidebar, Menu},
})
</script>

<template>
  <div class="flex bg-neutral h-screen">
    <AdminSidebar :state="true" />

    <div class="main-content w-full">
      <Menu></Menu>

      <div class="mx-5 mt-3">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<style>

</style>
