<template>
  <crud-page title="Role" module-name="roles" :columns="columns" :fields="fields" />
</template>

<script setup>
import CrudPage from '../components/CrudPage.vue';

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'level', label: 'Level', field: 'level', align: 'left' }
];

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'level', label: 'Level' }
];
</script>
