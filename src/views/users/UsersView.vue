<script>
import {defineComponent, reactive, ref, computed, onMounted, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useMeta} from "vue-meta"

import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from "primevue/paginator";

import UserFilterModal from "@/components/modals/UserFilterModal.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Dropdown, Button, DataTable, Column, Paginator, UserFilterModal},
  setup() {
    useMeta({
      title: 'Пользователи'
    });

    const store = useStore();
    const router = useRouter();

    const visibleModal = computed(() => store.getters.getUserFilterModal);

    const users = computed(() => store.getters.getUsersList);

    const roles = computed(() => store.getters.getRolesList);

    const first = ref(0);
    const selectedRole = ref('');

    const findUsers = async () => {
      const filterObject = {
        page: ((first.value / (users.value?.data?.pagination?.per_page ?? 1)) + 1),
      };

      if (selectedRole.value) {
        filterObject['role'] = selectedRole.value.id;
      }

      await store.dispatch(
          'fetchUsers',
          filterObject
      );

      window.scrollTo(0, 0);
    };

    const showUserFilterModal = () => {
      store.dispatch('changeStateModal', {
        type: 'userFilterModal',
        bool: !visibleModal.value,
      })
    }

    watch(selectedRole, async () => {
      await findUsers();
    })

    watch((first), async (index) => {
      await findUsers();
    });

    const toCreateUsers = () => {
      router.push({name: 'user-create'});
    };

    onMounted(async () => {
      await store.dispatch('fetchUsers');
      await store.dispatch('fetchRoles');
    });

    return {selectedRole, roles, users, toCreateUsers, first, visibleModal, showUserFilterModal};
  }
});
</script>

<template>
  <UserFilterModal
      filter-data=""
      :visible="visibleModal"
      :roles="roles"
  />

  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1 class="font-normal">Пользователи</h1>

      <div class="flex gap-2">
        <Dropdown
            v-model="selectedRole"
            :options="roles"
            optionLabel="name_ru"
            placeholder="Роли"
            class="w-full md:w-14rem border-radius-15"
        />

        <Button label="Создать пользователя" class="btn-primary font-light" @click="toCreateUsers"/>

        <Button icon="pi pi-filter" aria-label="Submit" class="btn-primary font-light" @click="showUserFilterModal"/>
      </div>
    </div>
  </section>

  <section class="mb-3 py-2">
    <div v-if="!users?.data?.data" class="flex justify-content-center align-items-center center-text-screen">
      <span class="color-black-40">
        Здесь пока ничего нет
      </span>
    </div>

    <div v-if="Array.isArray(users?.data?.data) ? users.data.data.length : false">
      <DataTable :value="users.data.data" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
        <Column field="id" header="ID" class="text-center"/>
        <Column field="first_name" header="ФИО">
          <template #body="slotProps">
            <router-link :to="{ name: 'user-edit', params: { id: slotProps.data.id }}"
                         class="color-black-80 color-primary-hover">
              {{ slotProps.data.last_name }} {{ slotProps.data.first_name }} {{ slotProps.data.patronymic }}
            </router-link>
          </template>
        </Column>
        <Column field="role" header="Роль">
          <template #body="slotProps">
            {{ slotProps.data.roles[0].name_ru }}
          </template>
        </Column>
        <Column field="phone" header="Контактный номер">
          <template #body="slotProps">
            {{ slotProps.data.phone_code }}{{ slotProps.data.phone }}
          </template>
        </Column>
      </DataTable>

      <Paginator
          v-model:first="first"
          :rows="users?.data?.pagination?.per_page ?? 0"
          :totalRecords="users?.data?.pagination?.total ?? 0"
          class="justify-content-start"
      ></Paginator>
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
