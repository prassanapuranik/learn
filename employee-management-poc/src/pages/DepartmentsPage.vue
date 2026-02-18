<template>
  <crud-page title="Department" module-name="departments" :columns="columns" :fields="fields" />
</template>

<script setup>
import CrudPage from '../components/CrudPage.vue';

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'description', label: 'Description', field: 'description', align: 'left' }
];

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'description', label: 'Description' }
];
</script>
