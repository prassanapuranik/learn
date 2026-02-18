<template>
  <crud-page title="Employee" module-name="employees" :columns="columns" :fields="fields" />
</template>

<script setup>
import CrudPage from '../components/CrudPage.vue';

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'department', label: 'Department', field: 'department', align: 'left' },
  { name: 'role', label: 'Role', field: 'role', align: 'left' }
];

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
  { name: 'department', label: 'Department' },
  { name: 'role', label: 'Role' }
];
</script>
