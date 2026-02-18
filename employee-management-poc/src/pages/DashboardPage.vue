<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">POC Dashboard</div>
    <div class="row q-col-gutter-md">
      <div v-for="card in cards" :key="card.label" class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-subtitle1">{{ card.label }}</div>
            <div class="text-h5">{{ card.count }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const cards = computed(() => [
  { label: 'Employees', count: store.getters['employees/all'].length },
  { label: 'Departments', count: store.getters['departments/all'].length },
  { label: 'Roles', count: store.getters['roles/all'].length },
  { label: 'Salaries', count: store.getters['salaries/all'].length },
  { label: 'Leaves', count: store.getters['leaves/all'].length }
]);
</script>
