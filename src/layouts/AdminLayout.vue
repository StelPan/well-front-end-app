<script>
import { defineComponent } from "vue";
import AdminSidebar from "@/components/sidebars/AdminSidebar.vue";

export default defineComponent({
  name: "AdminLayout",
  components: {AdminSidebar}
})
</script>

<template>
  <div class="flex">
    <AdminSidebar :state="true" />

    <div class="main-content bg-neutral">
      <router-view></router-view>
    </div>
  </div>
</template>
