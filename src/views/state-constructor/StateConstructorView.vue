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

    // [{ id: state, permission: [{id: permisison, paid}, {}] }]
    const modelStates = ref([]);
    const modelStatesCopy = ref([]);
    const changesStates = reactive({}); // { stateId: { permissionId: { access: true, paid: true,} }}

    const states = computed(() => store.getters.getStateList);
    const permissions = computed(() => store.getters.getPermissionList);

    const loadStateList = async () => {
      await store.dispatch('fetchStateList');
    };

    const loadPermissionList = async () => {
      await store.dispatch('fetchPermissions');
    };

    const fillChangesState = (stateId, permission) => {
      if (!changesStates[stateId]) {
        changesStates[stateId] = {};
      }

      changesStates[stateId][permission.id] = {
        paid: permission.paid,
        permission: permission.id,
        access: permission.access,
      }
    }

    const fillModelStates = () => {
      for (let state of states.value) {
        modelStates.value.push({
          ...state,
          permissions: [...permissions.value.map(permission => {
            return {
              id: permission.id,
              paid: state.permissions.find(p => permission.id === p.id)?.paid ?? 0,
              access: !!state.permissions.find(p => permission.id === p.id),
            }
          })]
        });
      }
    };

    const findPermission = (state, permission) => {
      return modelStates.value.find(s => s.id === state).permissions
          .find(p => p.id === permission);
    };

    const changeModelStateAccess = ({state, permission}) => {
      const perm = findPermission(state, permission);
      perm.access = !perm.access;

      if (perm.paid && !perm.access) {
        perm.paid = false;
      }

      fillChangesState(state, perm);
    }

    const changeModelStatePaid = ({state, permission}) => {
      const perm = findPermission(state, permission);
      perm.paid = !perm.paid;

      if (perm.paid && !perm.access) {
        perm.access = true;
      }

      fillChangesState(state, perm);
    };

    const storeChanges = () => {
      const changes = [];
      for (let stateId in changesStates) {
        for (let permissionId in changesStates[stateId]) {
          changes.push(store.dispatch('fetchUpdateState', {
            id: stateId,
            body: {
              permission: permissionId,
              paid: Number(changesStates[stateId][permissionId].paid)
            }
          }));
        }
      }

      console.log(changes);
    };

    onMounted(async () => {
      await loadPermissionList();
      await loadStateList();
      fillModelStates();

      modelStatesCopy.value = modelStates.value;
    });

    return {states, permissions, modelStates, changeModelStateAccess, changeModelStatePaid, changesStates, storeChanges};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1 class="font-normal">Конструктор состояний</h1>
      <Button @click="storeChanges" label="Сохранить изменения" class="btn-primary font-light"/>
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
                  @click="changeModelStateAccess({ state: state.id, permission: slotProps.data.id })"
                  :model-value="modelStates.find(s => s.id === state.id)?.permissions?.find(p => p.id === slotProps.data.id)?.access"
                  :binary="true"
                  name="category"
              />
              <label class="ml-2" :for="slotProps.data.id">Доступен</label>
            </div>

            <div class="flex align-items-center mb-2">
              <Checkbox
                  @click="changeModelStatePaid({ state: state.id, permission: slotProps.data.id })"
                  :model-value="modelStates.find(s => s.id === state.id)?.permissions?.find(p => p.id === slotProps.data.id)?.paid"
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
