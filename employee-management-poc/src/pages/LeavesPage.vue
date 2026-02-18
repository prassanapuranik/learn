<template>
  <crud-page title="Leave" module-name="leaves" :columns="columns" :fields="fields" />
</template>

<script setup>
import CrudPage from '../components/CrudPage.vue';

const columns = [
  { name: 'employee', label: 'Employee', field: 'employee', align: 'left' },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
  { name: 'from', label: 'From', field: 'from', align: 'left' },
  { name: 'to', label: 'To', field: 'to', align: 'left' },
  { name: 'status', label: 'Status', field: 'status', align: 'left' }
];

const fields = [
  { name: 'employee', label: 'Employee' },
  { name: 'type', label: 'Type' },
  { name: 'from', label: 'From', type: 'date' },
  { name: 'to', label: 'To', type: 'date' },
  { name: 'status', label: 'Status' }
];
</script>
