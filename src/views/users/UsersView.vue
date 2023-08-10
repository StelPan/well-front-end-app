<script>
import {defineComponent, reactive, ref, computed, onMounted} from "vue";
import {useStore} from "vuex";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Dropdown, Button, DataTable, Column},
  setup() {
    const store = useStore();

    const filter = reactive({
      roles: [],
    });

    onMounted(async () => {
      await store.dispatch('fetchRoles');

      await store.dispatch('fetchUsers');
    });

    const selectedRole = ref('');

    const users = computed(() => store.getters.getUsersList);

    const roles = computed(() => store.getters.getRolesList);

    return {selectedRole, roles, users};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1 class="font-normal">Пользователи</h1>

      <div class="flex gap-3">
        <Dropdown
            v-model="selectedRole" :options="roles"
            optionLabel="name_ru"
            placeholder="Роли" class="w-full md:w-14rem border-radius-15"/>

        <Button label="Создать пользователя" class="btn-primary font-light w-12"/>
      </div>
    </div>
  </section>

  <section class="mb-3 py-2">
    <div v-if="!users?.data?.length ?? 0" class="flex justify-content-center align-items-center center-text-screen">
      <span class="color-black-40">
        Здесь пока ничего нет
      </span>
    </div>

    <div v-if="users?.data?.length">
      <DataTable :value="users?.data ?? []" showGridlines tableStyle="min-width: 50rem">
        <Column field="id" header="ID" class="text-center"/>
        <Column field="first_name" header="ФИО">
          <template #body="slotProps">
            <router-link to="/users">
              {{ slotProps.data.last_name }} {{ slotProps.data.first_name }} {{ slotProps.data.patronymic }}
            </router-link>
          </template>
        </Column>
        <Column field="role" header="Роль">
          <template #body="slotProps">
            Администратор
          </template>
        </Column>
        <Column field="phone" header="Контактный номер">
          <template #body="slotProps">
            {{ slotProps.data.phone_code }}{{ slotProps.data.phone }}
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
</template>

<style scoped>
.p-dropdown-panel {
  border-radius: 15px !important;
}

.center-text-screen {
  height: calc(100vh - 200px);
}
</style>
