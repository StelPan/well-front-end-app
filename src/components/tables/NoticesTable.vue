<script>
import {defineComponent, ref} from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

export default defineComponent({
  components: {DataTable, Column, Button},
  props: {
    notices: {
      type: Array,
      required: true,
    },
    typeNotices: {
      type: Array,
      required: true,
    }
  },
  setup(props) {
    const notices = ref(props.notices);
    return {notices};
  }
});
</script>

<template>
  <DataTable :value="notices" showGridlines tableStyle="min-width: 50rem" selectionMode="single">
    <Column field="id" header="ID"></Column>

    <Column field="text" header="Текст сообщения">
      <template #body="slotProps">
        <router-link :to="{ name: 'notice-view', params: {id: slotProps.data.id }}" class="color-primary-hover">
          <span class="color-black-80" v-html="slotProps.data.text"></span>
        </router-link>
      </template>
    </Column>

    <Column field="text" header="Тип уведомления">
      <template #body="slotProps">
        {{ slotProps.data?.type ? slotProps.data?.type.name : 'Не задан' }}
      </template>
    </Column>

    <Column field="text" header="Статус">
      <template #body="slotProps">
        <Button
            rounded
            :class="{'btn-success': slotProps.data.state.code === 'sent', 'btn-black-20': slotProps.data.state.code === 'draft'}"
        >
          {{ slotProps.data.state.name }}
        </Button>
      </template>
    </Column>

    <Column field="text" header="Дата рассылки">
      <template #body="slotProps">
        <template v-if="!(slotProps.data.send_date && slotProps.data.send_time)">
          <span>Дата не указана</span>
        </template>
        <template v-else>
          <span>
            {{ slotProps.data.send_date }}
            {{ slotProps.data.send_time }}
          </span>
        </template>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>