<script>
import { defineComponent } from "vue";
import AdminSidebar from "@/components/sidebars/AdminSidebar.vue";

export default defineComponent({
  name: "AdminLayout",
  components: {AdminSidebar}
})
</script>

<template>
  <div class="grid">
    <AdminSidebar />

    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>
