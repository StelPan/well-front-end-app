<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useCounterparties} from "@/hooks/counterparties";
import {useFlat} from "@/hooks/flat";

import Button from "primevue/button";
import ButtonSuccess from "@/components/buttons/ButtonSuccess.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import CounterpartyIndividualEntrepreneurForm from "@/components/forms/CounterpartyIndividualEntrepreneurForm.vue";
import CounterpartyIndividualPersonForm from "@/components/forms/CounterpartyIndividualPersonForm.vue";
import CounterpartyJuridicalPersonForm from "@/components/forms/CounterpartyJuridicalPersonForm.vue";

export default defineComponent({
  layout: {name: 'AdminLayout'},
  components: {Breadcrumb,
    Button,
    ButtonSuccess,
    CounterpartyJuridicalPersonForm,
    CounterpartyIndividualEntrepreneurForm,
    CounterpartyIndividualPersonForm,
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const {loadCounterparty} = useCounterparties();
      await loadCounterparty(to.params.id);
    } catch (e) {
      console.error(e);
    }

    next();
  },
  setup(props) {
    const store = useStore();
    const {computedRules, counterparty} = useCounterparties();

    const form = ref({...useFlat(counterparty.value)});
    const breadcrumbs = ref([]);

    const tabSteps = ref(new Map([
      ['ul', 'CounterpartyJuridicalPersonForm'],
      ['ip', 'CounterpartyIndividualPersonForm'],
      ['fl', 'CounterpartyIndividualEntrepreneurForm'],
    ]));

    onMounted(() => {
      breadcrumbs.value = [
        {label: 'Контрагенты', router: {name: 'counterparties'}},
        {label: counterparty.value.full_name}
      ];
    });

    return {counterparty, form, breadcrumbs, tabSteps, computedRules};
  }
});
</script>

<template>
  <section class="py-2 mb-3">
    <div class="flex">
      <Breadcrumb :data="breadcrumbs" separator="/" />
    </div>
  </section>

  <component
      :is="tabSteps.get(counterparty.type)"
      :errors="computedRules"
      :form="form"
  />
</template>