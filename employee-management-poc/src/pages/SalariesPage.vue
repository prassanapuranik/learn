<template>
  <crud-page title="Salary" module-name="salaries" :columns="columns" :fields="fields" />
</template>

<script setup>
import CrudPage from '../components/CrudPage.vue';

const columns = [
  { name: 'employee', label: 'Employee', field: 'employee', align: 'left' },
  { name: 'amount', label: 'Amount', field: 'amount', align: 'left' },
  { name: 'effectiveDate', label: 'Effective Date', field: 'effectiveDate', align: 'left' }
];

const fields = [
  { name: 'employee', label: 'Employee' },
  { name: 'amount', label: 'Amount', type: 'number' },
  { name: 'effectiveDate', label: 'Effective Date', type: 'date' }
];
</script>
