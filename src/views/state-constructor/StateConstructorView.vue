<script>
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Checkbox from "primevue/checkbox";
import StateConstructorTable from "@/components/tables/StateConstructorTable.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, StateConstructorTable, DataTable, Column, Checkbox},
  setup() {
    const store = useStore();

    const changes = reactive({});

    const checkboxesState = reactive({});

    const states = computed(() => store.getters.getStateList);
    const permissions = computed(() => store.getters.getPermissionList);

    const loadStateList = async () => {
      await store.dispatch('fetchStateList');
    };

    const loadPermissionList = async () => {
      await store.dispatch('fetchPermissions');
    };

    const fillCheckboxesState = () => {
      for (let state of states.value) {
        checkboxesState[state.id] = {};
        for (let permission of permissions.value) {
          checkboxesState[state.id][permission.id] = {
            ...permission,
            paid: false,
            access: false,
          };
        }

        for (let permission of state.permissions) {
          if (checkboxesState[state.id][permission.id]) {
            checkboxesState[state.id][permission.id].paid = permission.paid;
            checkboxesState[state.id][permission.id].access = true;
          }
        }
      }
    };

    const changeCheckboxesState = (name, params = {}) => {
      const { permissionId, stateId } = params;
      switch (name) {
        case 'access':
          checkboxesState[stateId][permissionId].access = !checkboxesState[stateId][permissionId].access;
          if (!checkboxesState[stateId][permissionId].access) {
            checkboxesState[stateId][permissionId].paid = false;
          }
          break;
        case 'paid':
          checkboxesState[stateId][permissionId].paid = !checkboxesState[stateId][permissionId].paid;
          if (checkboxesState[stateId][permissionId].paid) {
            checkboxesState[stateId][permissionId].access = true;
          }
      }

      if (!changes[stateId]) {
        changes[stateId] = {};
      }

      changes[stateId] = { paid: checkboxesState[stateId][permissionId].paid, permissionId };
    };

    const makeChangesState = async () => {
      let reqs = [];
      for (let stateId in changes) {
        let state = changes[stateId];

        reqs.push(store.dispatch('fetchUpdateState', {
          id: stateId,
          body: {permission: state.permission, paid: state.access}
        }));

        await Promise.all(reqs);
      }
    };

    onMounted(async () => {
      await loadPermissionList();
      await loadStateList();
      fillCheckboxesState();
    });

    return {states, permissions, checkboxesState, changeCheckboxesState, changes};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1 class="font-normal">Конструктор состояний</h1>
      <Button label="Сохранить изменения" class="btn-primary font-light"/>
    </div>
  </section>

  <section class="py-2 mb-3">
    <DataTable :value="permissions">
      <Column header="Функция / блок">
        <template #body="slotProps">
          {{ slotProps.data.name }}
        </template>
      </Column>

      <template v-for="(state, i) in states" :key="state.id">
        <Column :field="state.code" :header="state.name">
          <!--          1 Permission-->
          <template #body="slotProps">
            <div class="flex align-items-center mb-2">
              <Checkbox
                  @click="changeCheckboxesState('access', { permissionId: slotProps.data.id, stateId: state.id  })"
                  :model-value="checkboxesState?.[state.id]?.[slotProps.data.id]?.access"
                  :binary="true"
                  name="category"
              />
              <label class="ml-2" :for="slotProps.data.id">Доступен</label>
            </div>

            <div class="flex align-items-center mb-2">
              <Checkbox
                  @click="changeCheckboxesState('paid', { permissionId: slotProps.data.id, stateId: state.id  })"
                  :model-value="checkboxesState?.[state.id]?.[slotProps.data.id]?.paid"
                  :binary="true"
                  name="category"
              />
              <label class="ml-2" :for="slotProps.data.id">Платный</label>
            </div>
          </template>
        </Column>
      </template>
    </DataTable>
  </section>
</template>

<style scoped lang="scss">

</style>
