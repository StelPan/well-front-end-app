<script>
import {computed, defineComponent, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useMeta} from "vue-meta";
import {useCreateReactiveCopy} from "@/hooks/useCreateReactiveCopy";

import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Checkbox from "primevue/checkbox";
import ButtonSuccess from "@/components/buttons/ButtonSuccess";
import StateConstructorTable from "@/components/tables/StateConstructorTable.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Button, StateConstructorTable, DataTable, Column, Checkbox, ButtonSuccess},
  async beforeRouteEnter(to, from, next) {
    try {
      const store = useStore();
      await store.dispatch('fetchPermissions');
      await store.dispatch('fetchStateList');
      next();
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    useMeta({
      title: 'Контруктор состояний'
    });

    const store = useStore();

    const modelStates = ref([]);
    const modelStatesCopy = ref([]);
    const changesStates = reactive({});
    const isUpdated = ref(false);

    const states = computed(() => store.getters.getStateList);
    const permissions = computed(() => store.getters.getPermissionList);

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

    const storeChanges = async () => {
      for (let stateId in changesStates) {
        for (let permissionId in changesStates[stateId]) {
          let body = {
            permission: permissionId,
            paid: Number(changesStates[stateId][permissionId].paid),
          };

          if (!Number(changesStates[stateId][permissionId].access)) {
            body.remove = 1;
          }

          await store.dispatch('fetchUpdateState', {
            id: stateId,
            body
          });
        }
      }

      isUpdated.value = true;
    };

    watch(changesStates, () => isUpdated.value = false);

    onMounted(() => {
      fillModelStates();
      modelStatesCopy.value = modelStates.value;
    });

    return {
      states,
      permissions,
      modelStates,
      changeModelStateAccess,
      changeModelStatePaid,
      changesStates,
      storeChanges,
      isUpdated
    };
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex justify-content-between">
      <h1 class="font-normal">Конструктор состояний</h1>
      <div class="flex">
        <ButtonSuccess v-if="isUpdated" label="Изменения сохранены" />
        <Button @click="storeChanges" label="Сохранить изменения" class="btn-primary font-light ml-2"/>
      </div>
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
                  :model-value="!!modelStates.find(s => s.id === state.id)?.permissions?.find(p => p.id === slotProps.data.id)?.paid"
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
